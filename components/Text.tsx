import { useFonts, Inter_300Light, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";

interface TextProps extends RNTextProps {
  weight?: "light" | "regular" | "bold";
  style?: RNTextProps["style"];
}

const Text: React.FC<TextProps> = ({ weight = "regular", style, ...props }) => {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_300Light,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (weight === "light") {
    return <RNText style={[styles.light, style]} {...props} />;
  }

  if (weight === "bold") {
    return <RNText style={[styles.bold, style]} {...props} />;
  }

  return <RNText style={[styles.regular, style]} {...props} />;
};

const styles = StyleSheet.create({
  light: {
    fontFamily: "Inter_300Light",
  },

  regular: {
    fontFamily: "Inter_400Regular",
  },

  bold: {
    fontFamily: "Inter_700Bold",
  },
});

export default Text;
