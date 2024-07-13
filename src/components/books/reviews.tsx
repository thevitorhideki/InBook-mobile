import { BookData } from '@/app/(app)/books/[bookId]';
import { Link } from 'expo-router';
import { View } from 'react-native';
import ReviewCard from '../reviewCard';
import { Text } from '../text';

type ReviewsProps = {
  bookDetails: BookData;
};

export default function Reviews({ bookDetails }: ReviewsProps) {
  return (
    <View className="items-center pb-64">
      {bookDetails.reviews.length === 0 ? (
        <Link
          href={`/books/${bookDetails.id}/reviews/book-review`}
          className="w-full rounded-lg border-2 border-gray-300 bg-gray-200 py-4 text-center dark:border-0 dark:bg-zinc-900"
        >
          <Text className="font-semibold text-base">Seja o primeiro a avaliar essa obra</Text>
        </Link>
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
            <Link
              href={`/books/${bookDetails.id}/reviews/book-review`}
              className="w-full rounded-lg border-2 bg-gray-50 py-4 text-center dark:border-0 dark:bg-zinc-900"
            >
              <Text className="font-semibold text-base">Avalie essa obra</Text>
            </Link>
            {bookDetails.reviews.slice(0, 10).map((review) => {
              if (review.title === '' && review.content === '') {
                return null;
              }
              return (
                <ReviewCard
                  key={review.user.username}
                  title={review.title}
                  content={review.content}
                  recommended={review.recommended}
                />
              );
            })}
            {bookDetails.reviews.length > 1 ? (
              <Link
                href={`/books/${bookDetails.id}/reviews/all-reviews`}
                className="w-full rounded-lg border-2 border-gray-300 bg-gray-200 py-4 text-center dark:border-0 dark:bg-zinc-900"
              >
                <Text className="font-semibold text-base">Ver todas as avaliações</Text>
              </Link>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
}
