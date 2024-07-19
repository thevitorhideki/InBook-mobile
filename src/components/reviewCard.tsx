import { colors } from '@/styles/colors';
import { Image } from 'expo-image';
import { ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { Text } from './text';

interface IReviewCardProps {
  username: string;
  avatarUrl?: string;
  title?: string;
  content?: string;
  enjoyedContent: boolean;
  enjoyedNarration: boolean;
  recommended: boolean;
}

export default function ReviewCard(props: IReviewCardProps) {
  const { colorScheme } = useColorScheme();
  const { username, avatarUrl, title, content, enjoyedContent, enjoyedNarration, recommended } =
    props;

  return (
    <View className="w-full gap-2 rounded-lg border-2 border-gray-400 p-4 dark:border-0 dark:bg-zinc-900">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={avatarUrl ? avatarUrl : require('@/assets/user.jpg')}
          style={{ width: 32, height: 32, borderRadius: 20 }}
        />
        <Text className="font-semibold text-base">{username}</Text>
      </View>
      {title ? (
        <View>
          <Text className="font-semibold text-base">{title}</Text>
          <Text className="text-base">{content}</Text>
        </View>
      ) : null}

      <View className="flex-row">
        <View className="flex-1 items-center gap-2">
          <Text className="text-center font-semibold text-base">Conteúdo</Text>
          {/* <Text
            className={clsx('flex-1 text-center text-base', {
              'color-green-500 dark:color-green-500': enjoyedContent,
              'color-red-500 dark:color-red-500': !enjoyedContent,
            })}
          >
            {recommended ? 'Gostei' : 'Não gostei'}
          </Text> */}
          {enjoyedContent ? (
            <ThumbsUp
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          ) : (
            <ThumbsDown
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          )}
        </View>
        <View className="flex-1 items-center gap-2">
          <Text className="text-center font-semibold text-base">Geral</Text>
          {/* <Text
            className={clsx('flex-1 text-center text-base', {
              'color-green-500 dark:color-green-500': recommended,
              'color-red-500 dark:color-red-500': !recommended,
            })}
          >
            {recommended ? 'Gostei' : 'Não gostei'}
          </Text> */}
          {recommended ? (
            <ThumbsUp
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          ) : (
            <ThumbsDown
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          )}
        </View>
        <View className="flex-1 items-center gap-2">
          <Text className="text-center font-semibold text-base">Narração</Text>
          {/* <Text
            className={clsx('flex-1 text-center text-base', {
              'color-green-500 dark:color-green-500': enjoyedNarration,
              'color-red-500 dark:color-red-500': !enjoyedNarration,
            })}
          >
            {recommended ? 'Gostei' : 'Não gostei'}
          </Text> */}
          {enjoyedNarration ? (
            <ThumbsUp
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          ) : (
            <ThumbsDown
              size={20}
              color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
            />
          )}
        </View>
      </View>
    </View>
  );
}
