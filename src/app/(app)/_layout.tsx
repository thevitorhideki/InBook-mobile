import { Loading } from '@/components/loading';
import { useSession } from '@/hooks/authContext';
import { authServer } from '@/server/auth-server';
import { Redirect, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const tokens = await authServer.refreshToken();
        await SecureStore.setItemAsync('session', tokens.access_token);
        await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
      } catch (error) {
        console.error(error);
      }
    };

    setInterval(refreshToken, 1000 * 60 * 15);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="books" />
      </Stack>
    </View>
  );
}
