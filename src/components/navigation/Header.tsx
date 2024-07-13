import { colors } from '@/constants/colors';
import { router, useSegments } from 'expo-router';
import { ChevronLeft, EllipsisVertical } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { ScreenStackHeaderConfigProps } from 'react-native-screens';
import { Text } from '../text';

type HeaderProps = ScreenStackHeaderConfigProps & {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  variant?: 'tabs' | 'stacks';
};

function Header({
  title = '',
  showBackButton = true,
  showMenuButton = true,
  variant = 'stacks',
  ...props
}: HeaderProps) {
  const { colorScheme } = useColorScheme();

  const backToHome = useSegments().includes('books');

  return (
    <View className="flex-row items-center justify-center py-5" {...props}>
      {showBackButton && (
        <ChevronLeft
          className="flex-1"
          size={40}
          onPress={() => {
            if (backToHome) {
              router.navigate('/');
            }
            if (router.canGoBack()) {
            }
          }}
          color={colorScheme === 'light' ? colors.light.text : colors.dark.text}
        />
      )}
      <Text className="flex-1 text-center font-semibold text-3xl">{title}</Text>
      {showMenuButton && (
        <EllipsisVertical
          className="flex-1"
          size={34}
          color={colorScheme === 'light' ? colors.light.text : colors.dark.text}
        />
      )}
    </View>
  );
}

export { Header };
