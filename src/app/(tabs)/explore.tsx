import { Text } from '@/components/text';
import { Image, View } from 'react-native';

export default function Explore() {
  return (
    <View>
      <View className="w-full flex-row items-center justify-between p-5">
        <Text className="text-3xl font-semibold">Explorar</Text>
        <Image
          className="h-10 w-10 rounded-full"
          source={require('@/assets/user.jpeg')}
          resizeMode="contain"
        />
      </View>
      <Text>Explorar</Text>
    </View>
  );
}
