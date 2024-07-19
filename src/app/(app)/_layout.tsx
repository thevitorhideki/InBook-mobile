import { Loading } from '@/components/loading';
import { useSession } from '@/hooks/authContext';
import { PlayerContextProvider } from '@/hooks/playerContext';
import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

export default function AppLayout() {
  const { session, isLoading, isLoadingUserData } = useSession();

  if (isLoading || isLoadingUserData) {
    return <Loading />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <PlayerContextProvider>
      <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="books" />
        </Stack>
      </View>
    </PlayerContextProvider>
  );
}
