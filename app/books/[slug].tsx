import { Link, useLocalSearchParams } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  const { slug } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Link href="/">Voltar</Link>
      <Text>Livro: {slug}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
