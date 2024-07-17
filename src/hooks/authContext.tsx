import { authServer } from '@/server/auth-server';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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

    checkTokenValidity();
  }, []);

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
            router.replace('/');
          } catch (error) {
            console.error(error);
          }
        },
        signOut: async () => {
          await SecureStore.deleteItemAsync('refresh_token');
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
