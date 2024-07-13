import { Loading } from '@/components/loading';
import TabBar from '@/components/navigation/TabBar';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
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
    <SafeAreaProvider>
      <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <Slot />
      </View>
      <TabBar />
    </SafeAreaProvider>
  );
}
