import { BookDetails } from '@/server/books-server';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';
import { Book } from '../book';
import { Text } from '../text';

export default function Author({ bookDetails }: { bookDetails: BookDetails }) {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { author } = bookDetails;

  return (
    <View className="gap-4 pb-44">
      <View className="flex-row gap-3">
        <Image
          source={author.avatarUrl}
          style={{ height: 70, width: 70, borderRadius: 35 }}
          transition={500}
        />
        <View style={{ flex: 1 }}>
          <Text className="font-semibold text-sm">{author.name}</Text>
          <Text className="text-justify">{author.about}</Text>
        </View>
      </View>

      {author.books.length > 1 ? (
        <View className="gap-2">
          <Text className="text-base">Outras obras de {author.name}</Text>
          <View className="flex-row gap-5">
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={author.books}
              keyExtractor={(book) => book.id.toString()}
              renderItem={(book) => {
                if (book.item.id === parseInt(bookId)) {
                  return null;
                } else {
                  return (
                    <Book
                      key={book.item.id}
                      id={book.item.id}
                      title={book.item.title}
                      author={author.name}
                      cover={book.item.coverImageUrl}
                    />
                  );
                }
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
