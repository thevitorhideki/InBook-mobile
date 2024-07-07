import { View } from 'react-native';
import Text from '../Text';

export default function Sinopse({ description }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={{ textAlign: 'justify' }}>{description}</Text>
    </View>
  );
}
