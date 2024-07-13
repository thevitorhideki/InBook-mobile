import { ActivityIndicator, View } from 'react-native';

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <ActivityIndicator size={42} />
    </View>
  );
}
