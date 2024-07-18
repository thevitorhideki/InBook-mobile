import { Book } from '@/components/book';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { BookCard, booksServer } from '@/server/books-server';
import { Genre } from '@/server/enums/genre';
import { colors } from '@/styles/colors';
import { toPascalCase } from '@/utils/toPascalCase';
import { Search, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function Explore() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([] as BookCard[]);
  const genres = Genre;

  async function handleSearch() {
    const books = await booksServer.searchByTitle(search);

    setBooks(books);
  }

  async function handleGetByGenre(genre: string) {
    const books = await booksServer.getByGenre(genre);

    setBooks(books);
  }

  useEffect(() => {
    if (search.length > 0) {
      handleSearch();
    } else {
      setBooks([]);
    }
  }, [search]);

  return (
    <View className="flex-1 gap-4">
      <Input variant="tertiary">
        <Search size={20} color={colors.zinc[400]} />
        <Input.Field
          placeholder="O que você deseja ler hoje?"
          onChangeText={setSearch}
          value={search}
        />
        {search.length > 0 ? (
          <X size={20} color={colors.zinc[400]} onPress={() => setSearch('')} />
        ) : null}
      </Input>
      {search.length > 0 || books.length > 0 ? (
        <Text>
          Pesquisando por <Text className="font-semibold">{search ? search : genre}</Text>
        </Text>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        {(books.length > 0 && (
          <View className="gap-4">
            {books.map((book) => {
              return (
                <Book
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author.name}
                  cover={book.coverImageUrl}
                  duration={book.duration}
                  pages={book.pages}
                  variation="secondary"
                />
              );
            })}
          </View>
        )) ||
          (search.length === 0 && (
            <View className="flex-row flex-wrap justify-center gap-4">
              {Object.values(genres).map((genre) => (
                <Pressable
                  key={genre}
                  className="h-28 w-1/3 flex-auto items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-900"
                  onPress={() => {
                    handleGetByGenre(genre);
                    setGenre(toPascalCase(genre));
                  }}
                >
                  <Text className="font-semibold text-base">{toPascalCase(genre)}</Text>
                </Pressable>
              ))}
            </View>
          )) || <Text className="text-center">Nenhum livro encontrado</Text>}
      </ScrollView>
    </View>
  );
}
