import { useThemeColor } from '@/hooks/useThemeColor';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

interface TextProps extends RNTextProps {
  weight?: 'light' | 'regular' | 'bold';
  fontSize?: number;
  style?: RNTextProps['style'];
}

const Text: React.FC<TextProps> = ({
  weight = 'regular',
  fontSize,
  style,
  ...props
}) => {
  const themeTextStyle = useThemeColor({}, 'text');

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_300Light,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (weight === 'light') {
    return (
      <RNText
        style={[
          { fontSize: fontSize, color: themeTextStyle },
          styles.light,
          style,
        ]}
        {...props}
      />
    );
  }

  if (weight === 'bold') {
    return (
      <RNText
        style={[
          { fontSize: fontSize, color: themeTextStyle },
          styles.bold,
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <RNText
      style={[
        { fontSize: fontSize, color: themeTextStyle },
        styles.regular,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  light: {
    fontFamily: 'Inter_300Light',
  },

  regular: {
    fontFamily: 'Inter_400Regular',
  },

  bold: {
    fontFamily: 'Inter_700Bold',
  },
});

export default Text;
