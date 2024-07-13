import { router } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from './text';

type BookProps = {
  id: number;
  title: string;
  author: string;
  cover: string;
};

export function Book({ id, title, author, cover }: BookProps) {
  function handleNavigateToBookDetails() {
    router.navigate(`/books/${id}`);
  }

  return (
    <TouchableOpacity
      className="max-w-48"
      onPress={handleNavigateToBookDetails}
      activeOpacity={0.5}
    >
      <Image source={{ uri: cover }} className="h-48 w-48 rounded-lg" />
      <View className="py-1">
        <Text className="text-md font-semibold">{title}</Text>
        <Text className="font-light text-sm">{author}</Text>
        <View className="flex-row items-center gap-1"></View>
      </View>
    </TouchableOpacity>
  );
}
