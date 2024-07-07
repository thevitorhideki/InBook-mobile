import { BookCollectionDto } from '@/api/dto/book-collection.dto';
import { Genre } from '@/api/enums/genre';
import { getBookByGenre } from '@/api/get-books-by-genre';
import { getBookByRelevance } from '@/api/get-books-by-relevance';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Book from './Book';
import Text from './Text';

interface IBookCollectionProps {
  title: string;
  genre?: Genre;
  type: 'genre' | 'relevance';
}

export default function BookCollection({
  title,
  genre,
  type,
}: IBookCollectionProps) {
  const [books, setBooks] = useState<BookCollectionDto['books']>([]);

  const makeBookCollection = async (genre: string) => {
    if (genre) {
      const response = await getBookByGenre(genre);
      setBooks(response.books);
    } else if (type === 'relevance') {
      const response = await getBookByRelevance();
      setBooks(response.books);
    }
  };

  useEffect(() => {
    makeBookCollection(genre);
  }, []);

  return (
    <View style={styles.collection}>
      <Text>
        {title
          .toLowerCase()
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.books}
      >
        {books.map((book) => {
          return (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author.name}
              duration={book.duration}
              pages={book.pages}
              cover={book.coverImageUrl}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  collection: {
    marginBottom: 14,
  },

  collectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  books: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    marginTop: 8,
  },
});
