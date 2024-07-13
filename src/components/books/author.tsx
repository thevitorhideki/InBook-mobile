import { BookDetails } from '@/server/books-server';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Image, View } from 'react-native';
import { Book } from '../book';
import { Text } from '../text';

export default function Author({ bookDetails }: { bookDetails: BookDetails }) {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { author } = bookDetails;

  return (
    <View style={{ gap: 14, marginBottom: 22 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image
          source={{ uri: author.avatarUrl }}
          style={{ height: 70, width: 70, borderRadius: 35 }}
        />
        <View style={{ flex: 1 }}>
          <Text className="text-sm font-semibold">{author.name}</Text>
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
