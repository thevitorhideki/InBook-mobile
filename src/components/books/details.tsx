import { convertTimeToString } from '@/utils/convertTimeToString';
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
        <Text className="flex-1 text-center font-semibold text-base">
          Duração{'\n'}
          <Text className="font-regular">{convertTimeToString(bookDetails.duration)}</Text>
        </Text>
        <Text className="flex-1 text-center font-semibold text-base">
          Páginas{'\n'}
          <Text className="font-regular">{bookDetails.pages}</Text>
        </Text>
      </View>
      <View className="flex-row">
        <Text className="flex-1 text-center font-semibold text-base">
          Ano de publicação{'\n'}
          <Text className="font-regular">{bookDetails.publicationYear}</Text>
        </Text>
        <Text className="flex-1 text-center font-semibold text-base">
          Gêneros{'\n'}
          <Text className="font-regular">{bookDetails.genres.join(', ')}</Text>
        </Text>
      </View>
      <View>
        <Text className="flex-1 text-center font-semibold text-base">
          Idioma{'\n'}
          <Text className="font-regular">{bookDetails.language}</Text>
        </Text>
      </View>
    </View>
  );
}
