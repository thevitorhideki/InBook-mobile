import { View } from 'react-native';

interface IVerticalLineProps {
  width?: number;
  color?: string;
}

export default function VerticalLine(props: IVerticalLineProps) {
  const { width = 0.5, color = 'black' } = props;
  return <View style={{ borderLeftWidth: width, borderColor: color }} />;
}
