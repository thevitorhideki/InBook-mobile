import { Book } from '@/components/book';
import { Text } from '@/components/text';
import { InteractionType } from '@/server/enums/interaction';
import { InteractionsByUser, interactionsServer } from '@/server/interactions-server';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Library() {
  const [interactions, setInteractions] = useState({} as InteractionsByUser);
  const [tab, setTab] = useState(InteractionType.DOWNLOADED);
  const [loading, setLoading] = useState(true);

  async function fetchInteractions() {
    try {
      setLoading(true);
      const interactions = await interactionsServer.getInteractionsByUser();

      setInteractions(interactions);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInteractions();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-1 px-5">
      <View className="flex-row items-end pb-5">
        <Text
          className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
            'border-orange-400': tab === InteractionType.DOWNLOADED,
            'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
              tab !== InteractionType.DOWNLOADED,
          })}
          onPress={() => {
            setTab(InteractionType.DOWNLOADED);
          }}
        >
          Baixados
        </Text>
        <Text
          className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
            'border-orange-400': tab === InteractionType.SAVED,
            'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
              tab !== InteractionType.SAVED,
          })}
          onPress={() => {
            setTab(InteractionType.SAVED);
          }}
        >
          Salvos
        </Text>
        <Text
          className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
            'border-orange-400': tab === InteractionType.READ,
            'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
              tab !== InteractionType.READ,
          })}
          onPress={() => {
            setTab(InteractionType.READ);
          }}
        >
          Finalizados
        </Text>
      </View>
      {tab === InteractionType.DOWNLOADED && (
        <View className="gap-4">
          {interactions['DOWNLOADED'].books.length === 0 ? (
            <View>
              <Text className="text-center">Nenhum livro baixado</Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text className="text-lg">Baixados </Text>
              <Text className="text-sm">({interactions['DOWNLOADED'].books.length})</Text>
            </View>
          )}
          {interactions['DOWNLOADED'].books.map((book) => (
            <Book
              variation="secondary"
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.coverImageUrl}
              duration={book.duration}
              pages={book.pages}
              author={book.author.name}
            />
          ))}
        </View>
      )}
      {tab === InteractionType.SAVED && (
        <View className="gap-4">
          {interactions['SAVED'].books.length === 0 ? (
            <View>
              <Text className="text-center">Nenhum livro salvo</Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text className="text-lg">Salvos </Text>
              <Text className="text-sm">({interactions['SAVED'].books.length})</Text>
            </View>
          )}
          {interactions['SAVED'].books.map((book) => (
            <Book
              variation="secondary"
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.coverImageUrl}
              duration={book.duration}
              pages={book.pages}
              author={book.author.name}
            />
          ))}
        </View>
      )}
      {tab === InteractionType.READ && (
        <View className="gap-4">
          {interactions['READ'].books.length === 0 ? (
            <View>
              <Text className="text-center">Nenhum livro finalizado</Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text className="text-lg">Finalizados </Text>
              <Text className="text-sm">({interactions['READ'].books.length})</Text>
            </View>
          )}
          {interactions['READ'].books.map((book) => (
            <Book
              variation="secondary"
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.coverImageUrl}
              duration={book.duration}
              pages={book.pages}
              author={book.author.name}
            />
          ))}
        </View>
      )}
    </View>
  );
}
