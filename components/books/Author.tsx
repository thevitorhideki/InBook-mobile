import { Image } from 'expo-image';
import { View } from 'react-native';
import Book from '../Book';
import Text from '../Text';

export default function Author({ authorDetails, bookDetails }) {
  return (
    <View style={{ gap: 14, marginBottom: 22 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image
          source={authorDetails.avatarUrl}
          style={{ height: 70, width: 70, borderRadius: 35 }}
        />
        <View style={{ flex: 1 }}>
          <Text weight="bold" fontSize={14}>
            {authorDetails.name}
          </Text>
          <Text style={{ textAlign: 'justify' }}>{authorDetails.about}</Text>
        </View>
      </View>
      {authorDetails.books.length > 1 ? (
        <View style={{ gap: 6 }}>
          <Text fontSize={14}>Outras obras de {authorDetails.name}</Text>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {authorDetails.books.map((book) => {
              if (book.title !== bookDetails.title) {
                return (
                  <Book
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    cover={book.coverImageUrl}
                    author={authorDetails.name}
                    duration={book.duration}
                    pages={book.pages}
                  />
                );
              }
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
}
