import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <Slot />
    </SafeAreaView>
  );
}
