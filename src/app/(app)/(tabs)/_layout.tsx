import { Header } from '@/components/header';
import TabBar from '@/components/navigation/TabBar';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <>
      <View className="flex-1 bg-zinc-50 px-5 dark:bg-zinc-950">
        <Header />
        <Slot />
      </View>
      <TabBar />
    </>
  );
}
