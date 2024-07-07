import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="reviews/all-reviews" />
      <Stack.Screen name="reviews/book-review" />
    </Stack>
  );
}
