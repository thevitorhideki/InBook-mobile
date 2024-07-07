import { Stack } from 'expo-router';

export default function BooksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[bookId]" />
    </Stack>
  );
}
