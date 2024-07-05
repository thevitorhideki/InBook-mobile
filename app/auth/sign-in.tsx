import Text from '@/components/Text';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
      <Link href="/">Back to home</Link>
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
