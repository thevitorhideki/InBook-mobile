import Text from '@/components/Text';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
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
