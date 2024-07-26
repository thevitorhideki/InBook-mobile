import { BookCollection } from '@/components/bookCollection';
import { Genre } from '@/server/enums/genre';
import { ScrollView, View } from 'react-native';

export default function Index() {
  return (
    <View className="bg-zinc-50 dark:bg-zinc-950">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4 pb-44">
        <BookCollection title="Histórias que você vai amar" />
        <BookCollection title="Obras de Romance mais aclamadas" genre={Genre.ROMANCE} />
      </ScrollView>
    </View>
  );
}
