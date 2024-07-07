import { useThemeColor } from '@/hooks/useThemeColor';
import { View } from 'react-native';

interface IVerticalLineProps {
  width?: number;
  color?: string;
}

export default function VerticalLine(props: IVerticalLineProps) {
  const themeTextStyle = useThemeColor({}, 'text');
  const { width = 0.5, color = themeTextStyle } = props;
  return <View style={{ borderLeftWidth: width, borderColor: color }} />;
}
