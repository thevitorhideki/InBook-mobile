import clsx from 'clsx';
import { View } from 'react-native';
import { Text } from './text';

interface IReviewCardProps {
  username?: string;
  avatarUrl?: string;
  title: string;
  content: string;
  recommended: boolean;
}

export default function ReviewCard(props: IReviewCardProps) {
  const { username, avatarUrl, title, content, recommended } = props;

  return (
    <View className="w-full gap-1 rounded-lg border-2 border-gray-300 bg-gray-200 p-4 dark:border-0 dark:bg-zinc-900">
      <Text className="font-semibold text-base">{title}</Text>
      <Text className="text-base">{content}</Text>
      <Text
        className={clsx('text-base', {
          'color-green-500 dark:color-green-500': recommended,
          'color-red-500 dark:color-red-500': !recommended,
        })}
      >
        {recommended ? 'Recomendado' : 'Não recomendado'}
      </Text>
    </View>
  );
}
