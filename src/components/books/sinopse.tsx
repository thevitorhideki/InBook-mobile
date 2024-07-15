import { View } from 'react-native';
import { Text } from '../text';

export default function Sinopse({ description }) {
  return (
    <View className="pb-48">
      <Text className="text-justify text-base">{description}</Text>
    </View>
  );
}
