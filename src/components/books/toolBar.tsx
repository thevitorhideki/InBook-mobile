import { InteractionType } from '@/server/enums/interaction';
import { interactionsServer } from '@/server/interactions-server';
import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import { router } from 'expo-router';
import { Glasses, Headphones } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../text';

type ToolBarProps = {
  bookId: number;
};

export function ToolBar({ bookId }: ToolBarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { colorScheme } = useColorScheme();

  async function fetchInteractions() {
    try {
      const interactions = await interactionsServer.getInteractionsByUserAndBook(bookId);

      if (interactions.length > 0) {
        setIsBookmarked(interactions.includes(InteractionType.SAVED));
        setIsDownloaded(interactions.includes(InteractionType.DOWNLOADED));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleBookmark() {
    try {
      if (isBookmarked) {
        await interactionsServer.removeInteraction(bookId, InteractionType.SAVED);
        setIsBookmarked(false);
      } else {
        await interactionsServer.createInteraction(bookId, InteractionType.SAVED);
        setIsBookmarked(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleDownload() {
    try {
      if (isDownloaded) {
        await interactionsServer.removeInteraction(bookId, InteractionType.DOWNLOADED);
        setIsDownloaded(false);
      } else {
        await interactionsServer.createInteraction(bookId, InteractionType.DOWNLOADED);
        setIsDownloaded(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchInteractions();
  }, []);

  return (
    <View className="absolute bottom-0 left-0 mb-5 w-full flex-row items-center justify-between gap-3 rounded-lg bg-zinc-200 dark:bg-zinc-900">
      <View className="flex-1 flex-row">
        <TouchableOpacity
          className="m-2 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.8}
          onPress={() => router.navigate(`/books/${bookId}/players/audiobook`)}
        >
          <Headphones
            size={24}
            color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]}
          />
          <Text className="text-base font-bold">Escutar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="my-2 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.8}
        >
          <Glasses size={24} color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]} />
          <Text className="text-base font-bold">Ler</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className={clsx('my-2 flex-row gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800', {
            'bg-orange-500': isDownloaded,
          })}
          activeOpacity={0.8}
          onPress={handleDownload}
        >
          <Ionicons
            name={isDownloaded ? 'arrow-down-circle' : 'arrow-down-circle-outline'}
            size={24}
            color={
              isDownloaded
                ? colors.zinc[100]
                : colorScheme === 'dark'
                  ? colors.zinc[100]
                  : colors.zinc[950]
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          className={clsx('m-2 flex-row gap-2 rounded-md bg-zinc-300 p-3 dark:bg-zinc-800', {
            'bg-orange-500': isBookmarked,
          })}
          activeOpacity={0.8}
          onPress={handleBookmark}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={
              isBookmarked
                ? colors.zinc[100]
                : colorScheme === 'dark'
                  ? colors.zinc[100]
                  : colors.zinc[950]
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
