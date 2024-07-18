import { authServer } from '@/server/auth-server';
import { userServer } from '@/server/user-server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useStorageState } from './useStorageState';

type UserData = {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void;
  signUp: (username: string, email: string, password: string) => void;
  signOut: () => void;
  fetchUserData: () => void;
  user?: UserData | null;
  session?: string | null;
  isLoading: boolean;
  isLoadingUserData: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  fetchUserData: () => null,
  user: null,
  session: null,
  isLoading: false,
  isLoadingUserData: false,
});

export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoadingUserData(true);
      const user = await userServer.getUserData();
      setUser({ ...user.profile });
      await AsyncStorage.setItem('user', JSON.stringify(user.profile));

      router.replace(user.profile.firstName ? '/' : '/profile');
    } catch (error) {
      console.error(error);
      setSession(null);
    } finally {
      setIsLoadingUserData(false);
    }
  }, [setSession]);

  const fetchUserDataStorage = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const isTokenExpired = useCallback((token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }, []);

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        const tokens = await authServer.signIn({ username, password });
        await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
        setSession(tokens.access_token);
        fetchUserData();
        router.replace('/');
      } catch (error) {
        console.error(error);
      }
    },
    [fetchUserData, setSession],
  );

  const signUp = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const tokens = await authServer.signUp({ username, email, password });
        await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
        setSession(tokens.access_token);
        router.replace('/profile');
      } catch (error) {
        console.error(error);
      }
    },
    [setSession],
  );

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync('refresh_token');
    setSession(null);
    setUser(null);
  }, [setSession]);

  useEffect(() => {
    // Check if the access token is expired, if so, refresh it
    const refreshAccessToken = async () => {
      const storedToken = await SecureStore.getItemAsync('refresh_token');
      try {
        const tokens = await authServer.refreshToken(storedToken);
        await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
        setSession(tokens.access_token);
      } catch (error) {
        console.error(error);
      }
    };

    if (session && isTokenExpired(session)) {
      refreshAccessToken();
    }
    if (session) {
      fetchUserDataStorage();
    }
  }, [session]);

  useEffect(() => {
    // Refresh the token every 10 minutes
    const interval = setInterval(
      async () => {
        const storedToken = await SecureStore.getItemAsync('refresh_token');
        if (storedToken) {
          try {
            const tokens = await authServer.refreshToken(storedToken);
            await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
            setSession(tokens.access_token);
          } catch (error) {
            console.error(error);
          }
        }
      },
      1000 * 60 * 10,
    );

    return () => clearInterval(interval);
  }, [setSession]);

  const contextValue = useMemo(
    () => ({
      signIn,
      signUp,
      signOut,
      fetchUserData,
      user,
      session,
      isLoading,
      isLoadingUserData,
    }),
    [signIn, signUp, signOut, fetchUserData, user, session, isLoading, isLoadingUserData],
  );

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}
