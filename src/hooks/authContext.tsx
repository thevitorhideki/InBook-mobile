import { authServer } from '@/server/auth-server';
import { UserData, userServer } from '@/server/user-server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useStorageState } from './useStorageState';

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

// This hook can be used to access the user info.
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
  const [user, setUser] = useState({} as UserData);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsLoadingUserData(true);
      const user = await userServer.getUserData();
      setUser(user);
      await AsyncStorage.setItem('user', JSON.stringify(user.profile));

      if (!user.profile.firstName) {
        router.replace('/profile');
      } else {
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  const isTokenExpired = () => {
    try {
      const { exp } = jwtDecode(session);
      return exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = await SecureStore.getItemAsync('refresh_token');
      if (!storedToken && isTokenExpired()) {
        try {
          await SecureStore.deleteItemAsync('refresh_token');
          setSession(null);
          router.replace('/sign-in');
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (session) {
      checkTokenValidity();
    }
    if (user?.id === undefined) {
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const storedToken = await SecureStore.getItemAsync('refresh_token');
        if (storedToken) {
          try {
            const tokens = await authServer.refreshToken();
            await SecureStore.setItemAsync('session', tokens.access_token);
            setSession(tokens.access_token);
          } catch (error) {
            console.error(error);
          }
        }
      },
      1000 * 60 * 10,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
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
        signUp: async (username, email, password) => {
          try {
            const tokens = await authServer.signUp({ username, email, password });
            await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
            setSession(tokens.access_token);
            router.replace('/profile');
          } catch (error) {
            console.error(error);
          }
        },
        signOut: async () => {
          await SecureStore.deleteItemAsync('refresh_token');
          setSession(null);
          setUser(null);
        },
        fetchUserData,
        user,
        session,
        isLoading,
        isLoadingUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
