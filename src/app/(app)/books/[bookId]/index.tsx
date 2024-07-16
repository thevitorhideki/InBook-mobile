import Author from '@/components/books/author';
import { Details } from '@/components/books/details';
import Reviews from '@/components/books/reviews';
import Sinopse from '@/components/books/sinopse';
import { ToolBar } from '@/components/books/toolBar';
import { Loading } from '@/components/loading';
import { Header } from '@/components/navigation/Header';
import { Text } from '@/components/text';
import { BookDetails, booksServer } from '@/server/books-server';
import clsx from 'clsx';
import { Image } from 'expo-image';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { ScrollView, View } from 'react-native';

export type BookData = {
  recommendedPercentage: number;
  enjoyedContentPercentage: number;
  enjoyedNarrationPercentage: number;
} & BookDetails;

enum Tab {
  Details = 'Details',
  Sinopse = 'Sinopse',
  Author = 'Author',
  Reviews = 'Reviews',
}

export default function Book() {
  const [tab, setTab] = useState(Tab.Details);
  const [bookDetails, setBookDetails] = useState({} as BookData);
  const [isLoadingBookDetails, setIsLoadingBookDetails] = useState(true);

  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  async function getBookDetails() {
    try {
      setIsLoadingBookDetails(true);

      if (!bookId) {
        return router.push('/404');
      }

      const bookDetails = await booksServer.getById(bookId);

      const recommendedPercentage = Math.round(
        (bookDetails.reviews.reduce((acc, review) => acc + (review.recommended ? 1 : 0), 0) /
          bookDetails.reviews.length) *
          100,
      );

      const enjoyedContentPercentage = Math.round(
        (bookDetails.reviews.reduce((acc, review) => acc + (review.enjoyedContent ? 1 : 0), 0) /
          bookDetails.reviews.length) *
          100,
      );

      const enjoyedNarrationPercentage = Math.round(
        (bookDetails.reviews.reduce((acc, review) => acc + (review.enjoyedNarration ? 1 : 0), 0) /
          bookDetails.reviews.length) *
          100,
      );

      setBookDetails({
        ...bookDetails,
        recommendedPercentage,
        enjoyedContentPercentage,
        enjoyedNarrationPercentage,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingBookDetails(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getBookDetails();
    }, [bookId]),
  );

  if (isLoadingBookDetails) {
    return <Loading />;
  }

  return (
    <>
      <View className="bg-zinc-50 px-5 dark:bg-zinc-950">
        <Header to={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            <Image
              source={{ uri: bookDetails.coverImageUrl }}
              style={{ height: 208, width: 208, alignSelf: 'center', borderRadius: 16 }}
            />
            <View className="flex-row">
              <View className="flex-1 items-center gap-2">
                <Text className="text-center font-semibold text-2xl">{bookDetails.title}</Text>
                <Text className="font-light text-base">{bookDetails.author.name}</Text>
              </View>
            </View>
            {bookDetails.reviews.length > 0 ? (
              <View className="flex-row items-center justify-center">
                <Text className="text-center font-semibold text-base color-orange-400 dark:color-orange-400">
                  {bookDetails.recommendedPercentage}% dos leitores recomendam esse livro{' '}
                </Text>
                <Text className="text-xs color-orange-400 dark:color-orange-400">
                  ({bookDetails.reviews.length})
                </Text>
              </View>
            ) : null}
          </View>
          <View className="flex-row py-5">
            <Text
              className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
                'border-orange-400': tab === 'Details',
                'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
                  tab !== 'Details',
              })}
              onPress={() => {
                setTab(Tab.Details);
              }}
            >
              Detalhes
            </Text>
            <Text
              className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
                'border-orange-400': tab === 'Sinopse',
                'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
                  tab !== 'Sinopse',
              })}
              onPress={() => {
                setTab(Tab.Sinopse);
              }}
            >
              Sinopse
            </Text>
            <Text
              className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
                'border-orange-400': tab === Tab.Author,
                'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
                  tab !== Tab.Author,
              })}
              onPress={() => {
                setTab(Tab.Author);
              }}
            >
              Autor
            </Text>
            <Text
              className={clsx('flex-1 border-b-2 py-2 text-center font-semibold text-base', {
                'border-orange-400': tab === Tab.Reviews,
                'border-gray-300 color-gray-300 dark:border-gray-500 dark:color-gray-500':
                  tab !== Tab.Reviews,
              })}
              onPress={() => {
                setTab(Tab.Reviews);
              }}
            >
              Avaliações
            </Text>
          </View>
          {(tab === 'Details' && (
            <Details
              duration={bookDetails.duration}
              pages={bookDetails.pages}
              publicationYear={bookDetails.publicationYear}
              genres={bookDetails.genres}
              language={bookDetails.language}
            />
          )) ||
            (tab === 'Sinopse' && <Sinopse description={bookDetails.description} />) ||
            (tab === 'Author' && <Author bookDetails={bookDetails} />) ||
            (tab === 'Reviews' && <Reviews bookDetails={bookDetails} />)}
        </ScrollView>
      </View>
      <ToolBar bookId={parseInt(bookId)} />
    </>
  );
}
