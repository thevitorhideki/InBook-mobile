import { StyleSheet, Text, View } from "react-native";

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text>Explore page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
