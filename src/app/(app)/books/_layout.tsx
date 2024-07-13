import TabBar from '@/components/navigation/TabBar';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function BooksLayout() {
  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[bookId]" />
      </Stack>
      <TabBar />
    </View>
  );
}
