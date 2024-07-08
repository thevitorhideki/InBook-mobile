import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function BooksLayout() {
  const themeBackgroundStyle = useThemeColor({}, 'background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeBackgroundStyle },
      }}
    >
      <Stack.Screen name="[bookId]" />
    </Stack>
  );
}
