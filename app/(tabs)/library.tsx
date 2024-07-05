import { StyleSheet, Text, View } from 'react-native';

export default function Library() {
  return (
    <View style={styles.container}>
      <Text>Library page</Text>
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
