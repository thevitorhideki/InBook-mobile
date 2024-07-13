import { Image } from 'expo-image';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
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
      className="mr-5 max-w-48"
      onPress={handleNavigateToBookDetails}
      activeOpacity={0.5}
    >
      <Image source={cover} style={{ width: 172, height: 172, borderRadius: 8 }} transition={500} />
      <View className="py-1">
        <Text className="text-md font-semibold">{title}</Text>
        <Text className="font-light text-sm">{author}</Text>
        <View className="flex-row items-center gap-1"></View>
      </View>
    </TouchableOpacity>
  );
}
