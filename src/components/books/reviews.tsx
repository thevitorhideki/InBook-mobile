import { BookData } from '@/app/(app)/books/[bookId]';
import { useSession } from '@/hooks/authContext';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { Pressable, View } from 'react-native';
import ReviewCard from '../reviewCard';
import { Text } from '../text';

type ReviewsProps = {
  bookDetails: BookData;
};

export default function Reviews({ bookDetails }: ReviewsProps) {
  const { session } = useSession();
  const userId = jwtDecode(session).sub;
  const hasReviewed = bookDetails.reviews.some(
    (review) => review.user.id === jwtDecode(session).sub,
  );

  return (
    <View className="items-center pb-44">
      {bookDetails.reviews.length === 0 ? (
        <Pressable
          onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/book-review`)}
          className="w-full rounded-lg border-2 bg-zinc-950 py-4 dark:border-0 dark:bg-zinc-900"
        >
          <Text className="text-center font-semibold text-base color-zinc-50">
            Seja o primeiro a avaliar essa obra
          </Text>
        </Pressable>
      ) : (
        <>
          <Text className="font-semibold text-lg">
            {bookDetails.reviews.length > 1
              ? `Opinião de ${bookDetails.reviews.length} leitores`
              : `Opinião de ${bookDetails.reviews.length} leitor`}
          </Text>
          <View className="mt-3 flex-row gap-6">
            <View className="items-center">
              <Text className="font-semibold text-base">
                {bookDetails.enjoyedContentPercentage}%
              </Text>
              <Text className="font-semibold text-base">gostaram do conteúdo</Text>
            </View>
            <View className="border-l border-gray-400 dark:border-gray-500" />
            <View className="items-center">
              <Text className="font-semibold text-base">
                {bookDetails.enjoyedNarrationPercentage}%
              </Text>
              <Text className="font-semibold text-base">gostaram da narração</Text>
            </View>
          </View>
          <View className="mt-4 w-full items-center gap-2">
            {!hasReviewed ? (
              <Pressable
                onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/book-review`)}
                className="w-full rounded-lg border-2 border-zinc-400 py-4 dark:border-0 dark:bg-zinc-900"
              >
                <Text className="text-center font-semibold text-base">Avalie essa obra</Text>
              </Pressable>
            ) : null}

            <View className="w-full flex-1 gap-2">
              {hasReviewed ? <Text className="text-left font-semibold">Sua avaliação</Text> : null}
              {bookDetails.reviews.map((review) => {
                if (review.user.id !== userId) {
                  return null;
                }

                return (
                  <ReviewCard
                    key={review.reviewId}
                    username={review.user.username}
                    avatarUrl={review.user.avatarUrl}
                    title={review.title}
                    content={review.content}
                    recommended={review.recommended}
                    enjoyedContent={review.enjoyedContent}
                    enjoyedNarration={review.enjoyedNarration}
                  />
                );
              })}

              {bookDetails.reviews.filter((review) => review.user.id !== userId).length !== 0 ? (
                <Text className="text-left font-semibold">Avaliações de outros leitores</Text>
              ) : null}
              {bookDetails.reviews.slice(0, 10).map((review) => {
                if (review.user.id === userId) {
                  return null;
                }

                return (
                  <ReviewCard
                    key={review.reviewId}
                    username={review.user.username}
                    avatarUrl={review.user.avatarUrl}
                    title={review.title}
                    content={review.content}
                    recommended={review.recommended}
                    enjoyedContent={review.enjoyedContent}
                    enjoyedNarration={review.enjoyedNarration}
                  />
                );
              })}
            </View>

            {bookDetails.reviews.length > 1 ? (
              <Pressable
                onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/all-reviews`)}
                className="w-full rounded-lg border-2 border-zinc-400 py-4 dark:border-0 dark:bg-zinc-900"
              >
                <Text className="text-center font-semibold text-base">Ver todas as avaliações</Text>
              </Pressable>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
}
