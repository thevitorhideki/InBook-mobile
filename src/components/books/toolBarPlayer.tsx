import { PlaybackSpeed, usePlayer } from '@/hooks/playerContext';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { Glasses, Pause, PlayIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Text } from '../text';

type ToolBarProps = {
  bookId: number;
};

export function ToolBarPlayer({ bookId }: ToolBarProps) {
  const {
    speed,
    isPlaying,
    isLoadingAudio,
    sound,
    setPlaybackSpeed,
    playAudio,
    pauseAudio,
    resumeAudio,
  } = usePlayer();

  const { colorScheme } = useColorScheme();

  return (
    <View className="absolute bottom-0 left-5 mb-5 w-11/12 flex-row items-center justify-between rounded-lg bg-zinc-200 dark:bg-zinc-900">
      <TouchableOpacity
        className="m-2 flex-1 items-center rounded-md bg-zinc-300 p-3 dark:bg-zinc-800"
        onPress={() => {
          if (speed === PlaybackSpeed.Slow) {
            setPlaybackSpeed(PlaybackSpeed.Normal);
          } else if (speed === PlaybackSpeed.Normal) {
            setPlaybackSpeed(PlaybackSpeed.Fast);
          } else {
            setPlaybackSpeed(PlaybackSpeed.Slow);
          }
        }}
      >
        <Text className="text-base font-bold">
          {speed === PlaybackSpeed.Slow ? '0.5x' : speed === PlaybackSpeed.Normal ? '1x' : '2x'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => {
          if (isPlaying) {
            pauseAudio();
          } else if (!isPlaying) {
            if (sound) {
              resumeAudio();
            } else {
              playAudio();
            }
          }
        }}
      >
        {isLoadingAudio ? (
          <ActivityIndicator />
        ) : isPlaying ? (
          <Pause size={28} color={colors[colorScheme].icon} />
        ) : (
          <PlayIcon size={28} color={colors[colorScheme].icon} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className="m-2 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-300 p-3 dark:bg-zinc-800"
        activeOpacity={0.5}
        onPress={() => router.navigate(`/books/${bookId}/players/ebook`)}
      >
        <Glasses size={24} color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]} />
        <Text className="text-base font-bold">Ler</Text>
      </TouchableOpacity>
    </View>
  );
}
