import { Loading } from '@/components/loading';
import { SessionProvider } from '@/hooks/authContext';
import '@/styles/globals.css';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Slot } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return <Loading />;
  }

  return (
    <SessionProvider>
      <View className="flex-1 bg-zinc-50 px-5 dark:bg-zinc-950" style={{ paddingTop: insets.top }}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <Slot />
      </View>
    </SessionProvider>
  );
}
