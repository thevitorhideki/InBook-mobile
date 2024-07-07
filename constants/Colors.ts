/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF9900';
const tintColorDark = '#FF9900';

export const Colors = {
  light: {
    text: '#111812',
    background: '#fff',
    tint: tintColorLight,
    icon: '#111812',
    card: '#F1F1F1',
    border: '#E7E7E7',
    tabIconDefault: '#848484',
    tabIconSelected: tintColorLight,
    tabColor: 'rgba(254, 254, 254, 0.9)',
    recommendationColor: '#293287',
    recommendedColor: '#329223',
    notRecommendedColor: '#E36161',
  },
  dark: {
    text: '#BEBEBE',
    background: '#0F0F0F',
    tint: tintColorDark,
    icon: '#BEBEBE',
    card: '#1A1A1A',
    border: '#1D1D1D',
    tabIconDefault: '#BEBEBE',
    tabIconSelected: tintColorDark,
    tabColor: 'rgba(24, 24, 24, 0.75)',
    recommendationColor: '#97A1FF',
    recommendedColor: '#54DC3E',
    notRecommendedColor: '#FF5E5E',
  },
};
