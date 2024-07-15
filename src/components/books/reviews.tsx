import { BookData } from '@/app/(app)/books/[bookId]';
import { useSession } from '@/hooks/authContext';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { View } from 'react-native';
import { Button } from '../button';
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
    <View className="items-center pb-48">
      {bookDetails.reviews.length === 0 ? (
        <Button onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/book-review`)}>
          <Button.Title>Seja o primeiro a avaliar essa obra</Button.Title>
        </Button>
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
              <Button
                onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/book-review`)}
              >
                <Button.Title>Avalie essa obra</Button.Title>
              </Button>
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
              <Button
                onPress={() => router.navigate(`/books/${bookDetails.id}/reviews/all-reviews`)}
              >
                <Button.Title>Ver todas as avaliações</Button.Title>
              </Button>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
}
