import { Header } from '@/components/header';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <Slot />
    </View>
  );
}
