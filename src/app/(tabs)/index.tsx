import { BookCollection } from '@/components/bookCollection';
import { Text } from '@/components/text';
import { Genre } from '@/server/enums/genre';
import { Image, ScrollView, View } from 'react-native';

export default function Index() {
  return (
    <View className="mb-20 px-5">
      <View className="w-full flex-row items-center justify-between py-5">
        <Text className="font-semibold text-3xl">Olá, Daniela!</Text>
        <Image
          className="h-10 w-10 rounded-full"
          source={require('@/assets/user.jpeg')}
          resizeMode="contain"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4 pb-44">
        <BookCollection title="Histórias que você vai amar" />
        <BookCollection title="Descubra historias emocionantes" genre={Genre.ROMANCE} />
        <BookCollection title="Descubra historias emocionantes" genre={Genre.ADVENTURE} />
      </ScrollView>
    </View>
  );
}
