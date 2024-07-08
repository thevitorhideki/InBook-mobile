import Header from '@/components/navigation/Header';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function Layout() {
  const themeBackgroundStyle = useThemeColor({}, 'background');

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: themeBackgroundStyle },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ header: () => <Header title={''} /> }}
      />
      <Stack.Screen
        name="reviews/all-reviews"
        options={{ header: () => <Header title={'Avaliações'} /> }}
      />
      <Stack.Screen
        name="reviews/book-review"
        options={{ header: () => <Header title={'Avaliação'} /> }}
      />
    </Stack>
  );
}
