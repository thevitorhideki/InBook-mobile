import { timeToString } from '@/utils/timeToString';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './text';

type BookProps = {
  id: number;
  title: string;
  author: string;
  cover: string;
  duration?: number;
  pages?: number;
  variation?: 'primary' | 'secondary';
};

export function Book({
  id,
  title,
  author,
  cover,
  duration,
  pages,
  variation = 'primary',
}: BookProps) {
  return (
    <>
      {(variation === 'primary' && (
        <TouchableOpacity
          className="mr-5 max-w-48"
          onPress={() => router.replace(`/books/${id}`)}
          activeOpacity={0.8}
        >
          <Image
            source={cover}
            style={{ width: 172, height: 172, borderRadius: 8 }}
            transition={500}
          />
          <View className="py-1">
            <Text className="text-md font-semibold">{title}</Text>
            <Text className="font-light text-sm">{author}</Text>
            <View className="flex-row items-center gap-1"></View>
          </View>
        </TouchableOpacity>
      )) ||
        (variation === 'secondary' && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace(`/books/${id}`)}>
            <View className="w-full flex-row rounded-lg bg-zinc-200 dark:bg-zinc-900">
              <Image
                source={cover}
                style={{ width: 128, height: 128, borderRadius: 8 }}
                transition={500}
              />
              <View className="flex-1 justify-between p-4">
                <View>
                  <Text className="font-semibold text-base">{title}</Text>
                  <Text className="font-light text-sm">{author}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Text className="font-light text-sm">{timeToString(duration)}</Text>
                  <Text className="">|</Text>
                  <Text className="font-light text-sm">{pages} páginas</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
}
