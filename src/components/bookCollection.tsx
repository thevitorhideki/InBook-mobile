import { BookCard, booksServer } from '@/server/books-server';
import { Genre } from '@/server/enums/genre';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Book } from './book';
import { Loading } from './loading';

type BookCollectionProps = {
  title: string;
  genre?: Genre;
};

export function BookCollection({ title, genre }: BookCollectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([] as BookCard[]);

  async function getBookCardDetails(genre: string) {
    try {
      setIsLoading(true);

      if (genre) {
        const books = await booksServer.getByGenre(genre);

        setBooks(books);
      } else {
        const books = await booksServer.getByRelevance();

        setBooks(books);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBookCardDetails(genre);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg dark:color-zinc-200">{title}</Text>
        {books.length > 10 && <Text className="text-sm font-light">Ver todos</Text>}
      </View>

      <FlatList
        contentContainerClassName="gap-5"
        showsHorizontalScrollIndicator={false}
        horizontal
        data={books}
        keyExtractor={(book) => book.id.toString()}
        renderItem={(book) => (
          <Book
            key={book.item.id}
            id={book.item.id}
            title={book.item.title}
            author={book.item.author.name}
            cover={book.item.coverImageUrl}
          />
        )}
      />
    </View>
  );
}
