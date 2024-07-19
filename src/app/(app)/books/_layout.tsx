import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function BooksLayout() {
  return (
    <View className="flex-1 bg-zinc-50 px-5 dark:bg-zinc-950">
      <Slot />
    </View>
  );
}
