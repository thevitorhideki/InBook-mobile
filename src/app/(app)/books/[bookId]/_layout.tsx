import { colors } from '@/styles/colors';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function BooksLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor:
            colorScheme === 'dark' ? colors.dark.background : colors.light.background,
        },
        headerShown: false,
      }}
    />
  );
}
