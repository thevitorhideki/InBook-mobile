import Text from '@/components/Text';
import { StyleSheet, View } from 'react-native';

export default function Reviews() {
  return (
    <View style={styles.container}>
      <Text>Review page</Text>
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
