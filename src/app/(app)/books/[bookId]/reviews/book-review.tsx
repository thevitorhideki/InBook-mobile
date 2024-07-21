import { Button } from '@/components/button';
import { Header } from '@/components/navigation/Header';
import { Text } from '@/components/text';
import { reviewsServer } from '@/server/reviews-server';
import clsx from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';

export default function Reviews() {
  const { bookId } = useLocalSearchParams();

  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [enjoyedContent, setEnjoyedContent] = useState(null);
  const [enjoyedNarration, setEnjoyedNarration] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmitReview = async () => {
    try {
      setIsCreatingReview(true);

      if (!enjoyedContent || !enjoyedNarration || !recommended) {
        Alert.alert(
          'Dados inválidos',
          `Por favor, preencha o campo de ${!enjoyedContent ? 'conteúdo' : !enjoyedNarration ? 'narração' : 'recomendação geral'}`,
        );
        return;
      }

      if (title && !content) {
        Alert.alert('Dados inválidos', 'Por favor, escreva sobre sua experiência');
        return;
      }

      await reviewsServer.createReview(bookId as string, {
        enjoyedContent,
        enjoyedNarration,
        recommended,
        title,
        content,
      });

      Alert.alert('Avaliação enviada!', 'Obrigado por avaliar a obra!');
      router.navigate(`books/${bookId}/reviews/all-reviews`);
    } catch (error) {
      if (error.message === 'Você já avaliou este livro') {
        Alert.alert('Avaliação duplicada', 'Você já avaliou este livro');
        router.back();
        return;
      }
    } finally {
      setIsCreatingReview(false);
    }
  };

  return (
    <View className="mb-20">
      <Header title="Avaliação" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image
          source={{ body: bookDetails.coverUrl }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 8,
            alignSelf: 'center',
          }}
        /> */}
        <Text className="text-center text-base">
          Gostaríamos de saber a sua opinião sobre a obra
        </Text>
        <View className="mt-4 gap-3">
          <View className="flex-row items-center justify-between">
            <Text>Conteúdo</Text>
            <View className="flex-row gap-4">
              <Text
                className={clsx(
                  'rounded-lg border-2 border-green-300 px-4 py-2 font-semibold dark:border-green-600',
                  {
                    'bg-green-200 dark:bg-green-900': enjoyedContent === true,
                    'bg-transparent': enjoyedContent === false,
                  },
                )}
                onPress={() => setEnjoyedContent(true)}
              >
                Gostei
              </Text>
              <Text
                className={clsx(
                  'rounded-lg border-2 border-red-300 px-4 py-2 font-semibold dark:border-red-600',
                  {
                    'bg-red-200 dark:bg-red-900': enjoyedContent === false,
                    'bg-transparent': enjoyedContent === true,
                  },
                )}
                onPress={() => setEnjoyedContent(false)}
              >
                Não gostei
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text>Narração</Text>
            <View className="flex-row gap-4">
              <Text
                className={clsx(
                  'rounded-lg border-2 border-green-300 px-4 py-2 font-semibold dark:border-green-600',
                  {
                    'bg-green-200 dark:bg-green-900': enjoyedNarration === true,
                    'bg-transparent': enjoyedNarration === false,
                  },
                )}
                onPress={() => setEnjoyedNarration(true)}
              >
                Gostei
              </Text>
              <Text
                className={clsx(
                  'rounded-lg border-2 border-red-300 px-4 py-2 font-semibold dark:border-red-600',
                  {
                    'bg-red-200 dark:bg-red-900': enjoyedNarration === false,
                    'bg-transparent': enjoyedNarration === true,
                  },
                )}
                onPress={() => setEnjoyedNarration(false)}
              >
                Não gostei
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text>Geral</Text>
            <View className="flex-row gap-4">
              <Text
                className={clsx(
                  'rounded-lg border-2 border-green-300 px-4 py-2 font-semibold dark:border-green-600',
                  {
                    'bg-green-200 dark:bg-green-900': recommended === true,
                    'bg-transparent': recommended === false,
                  },
                )}
                onPress={() => setRecommended(true)}
              >
                Gostei
              </Text>
              <Text
                className={clsx(
                  'rounded-lg border-2 border-red-300 px-4 py-2 font-semibold dark:border-red-600',
                  {
                    'bg-red-200 dark:bg-red-900': recommended === false,
                    'bg-transparent': recommended === true,
                  },
                )}
                onPress={() => setRecommended(false)}
              >
                Não gostei
              </Text>
            </View>
          </View>
          <Text>Dê um título para o seu comentário</Text>
          <TextInput
            placeholder="O que você achou?"
            className="rounded-lg border-2 border-zinc-400 p-3 placeholder:color-zinc-400 dark:border-zinc-800 dark:color-zinc-300 dark:placeholder:color-zinc-500"
            value={title}
            onChangeText={setTitle}
            autoCorrect={false}
          />
          <Text>Escreva sua avaliação</Text>
          <TextInput
            placeholder="Escreva sobre sua experiência"
            className="rounded-lg border-2 border-zinc-400 p-3 placeholder:color-zinc-400 dark:border-zinc-800 dark:color-zinc-300 dark:placeholder:color-zinc-500"
            multiline={true}
            value={content}
            onChangeText={setContent}
            autoCorrect={false}
          />
          <Button onPress={handleSubmitReview} isLoading={isCreatingReview}>
            <Button.Title>Enviar</Button.Title>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
