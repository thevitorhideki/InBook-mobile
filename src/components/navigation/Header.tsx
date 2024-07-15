import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { ChevronLeft, EllipsisVertical } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { ScreenStackHeaderConfigProps } from 'react-native-screens';
import { Text } from '../text';

type HeaderProps = ScreenStackHeaderConfigProps & {
  title?: string;
  to?: () => void;
  variant?: 'tabs' | 'stacks';
};

function Header({
  title = '',
  to = () => router.back(),
  variant = 'stacks',
  ...props
}: HeaderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center py-5" {...props}>
      <ChevronLeft
        className="flex-1"
        size={40}
        onPress={to}
        color={colorScheme === 'light' ? colors.light.text : colors.dark.text}
      />

      <Text className="flex-1 text-center font-semibold text-3xl">{title}</Text>

      <EllipsisVertical
        className="flex-1"
        size={34}
        color={colorScheme === 'light' ? colors.light.text : colors.dark.text}
      />
    </View>
  );
}

export { Header };
