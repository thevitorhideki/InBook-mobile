import { View } from 'react-native';
import { Text } from '../text';

export default function Sinopse({ description }) {
  return (
    <View className="pb-44">
      <Text className="text-justify">{description}</Text>
    </View>
  );
}
