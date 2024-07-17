import { Loading } from '@/components/loading';
import { useSession } from '@/hooks/authContext';
import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useSession();

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
