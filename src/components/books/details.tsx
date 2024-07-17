import { timeToString } from '@/utils/timeToString';
import { toPascalCase } from '@/utils/toPascalCase';
import { View } from 'react-native';
import { Text } from '../text';

type BookDetails = {
  duration: number;
  pages: number;
  publicationYear: number;
  genres: string[];
  language: string;
};

export function Details(bookDetails: BookDetails) {
  return (
    <View className="flex-1 gap-6">
      <View className="flex-row">
        <Text className="flex-1 font-semibold text-base">
          Duração{'\n'}
          <Text className="font-light color-zinc-600 dark:color-zinc-300">
            {timeToString(bookDetails.duration)}
          </Text>
        </Text>
        <Text className="flex-1 font-semibold text-base">
          Páginas{'\n'}
          <Text className="font-light color-zinc-600 dark:color-zinc-300">{bookDetails.pages}</Text>
        </Text>
      </View>
      <View className="flex-row">
        <Text className="flex-1 font-semibold text-base">
          Ano de publicação{'\n'}
          <Text className="font-light color-zinc-600 dark:color-zinc-300">
            {bookDetails.publicationYear}
          </Text>
        </Text>
        <Text className="flex-1 font-semibold text-base">
          Gêneros{'\n'}
          <Text className="font-light color-zinc-600 dark:color-zinc-300">
            {bookDetails.genres.map(toPascalCase).join(', ')}
          </Text>
        </Text>
      </View>
      <View>
        <Text className="flex-1 font-semibold text-base">
          Idioma{'\n'}
          <Text className="font-light color-zinc-600 dark:color-zinc-300">
            {toPascalCase(bookDetails.language)}
          </Text>
        </Text>
      </View>
    </View>
  );
}
