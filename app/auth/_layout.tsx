import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function Layout() {
  const themeBackgroundStyle = useThemeColor({}, 'background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeBackgroundStyle },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
