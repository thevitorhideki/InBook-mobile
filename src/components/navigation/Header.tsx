import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ChevronLeft, EllipsisVertical } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { ScreenStackHeaderConfigProps } from 'react-native-screens';
import { Text } from '../text';

type HeaderProps = ScreenStackHeaderConfigProps & {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
};

function Header({
  title = '',
  showBackButton = true,
  showMenuButton = true,
  ...props
}: HeaderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center py-5" {...props}>
      {showBackButton && (
        <ChevronLeft
          className="flex-1"
          size={40}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.navigate('/');
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
