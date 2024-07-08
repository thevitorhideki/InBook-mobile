import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const themeBackgroundStyle = useThemeColor({}, 'background');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: themeBackgroundStyle },
        }}
      />
    </SafeAreaProvider>
  );
}
