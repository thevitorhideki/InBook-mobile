import { Loading } from '@/components/loading';
import { Header } from '@/components/navigation/Header';
import ReviewCard from '@/components/reviewCard';
import { Text } from '@/components/text';
import { ReviewDetails, reviewsServer } from '@/server/reviews-server';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

type ReviewsData = {
  recommendedPercentage: number;
  enjoyedContentPercentage: number;
  enjoyedNarrationPercentage: number;
  reviews: ReviewDetails[];
};

export default function Reviews() {
  const [reviewsData, setReviewsData] = useState({} as ReviewsData);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const { bookId } = useLocalSearchParams();

  async function fetchReviews() {
    try {
      const reviews = await reviewsServer.getReviews(bookId as string);

      const recommendedPercentage = Math.round(
        (reviews.reduce((acc, review) => acc + (review.recommended ? 1 : 0), 0) / reviews.length) *
          100,
      );

      const enjoyedContentPercentage = Math.round(
        (reviews.reduce((acc, review) => acc + (review.enjoyedContent ? 1 : 0), 0) /
          reviews.length) *
          100,
      );

      const enjoyedNarrationPercentage = Math.round(
        (reviews.reduce((acc, review) => acc + (review.enjoyedNarration ? 1 : 0), 0) /
          reviews.length) *
          100,
      );

      setReviewsData({
        recommendedPercentage,
        enjoyedContentPercentage,
        enjoyedNarrationPercentage,
        reviews,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingReviews(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  if (isLoadingReviews) {
    return <Loading />;
  }

  return (
    <View className="px-5">
      <Header title="Avaliações" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center gap-3">
          <Text className="font-semibold text-xl">
            {reviewsData.reviews.length > 1
              ? `Opinião de ${reviewsData.reviews.length} leitores`
              : `Opinião de ${reviewsData.reviews.length} leitor`}
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 items-center">
              <Text className="font-semibold text-sm">{reviewsData.enjoyedContentPercentage}%</Text>
              <Text className="text-center font-semibold text-sm">gostaram do conteúdo</Text>
            </View>
            <View className="border-l border-gray-200 dark:border-gray-500" />
            <View className="flex-1 items-center">
              <Text className="font-semibold text-sm">{reviewsData.recommendedPercentage}%</Text>
              <Text className="text-center font-semibold text-sm">recomendam esse livro</Text>
            </View>
            <View className="border-l border-gray-200 dark:border-gray-500" />
            <View className="flex-1 items-center">
              <Text className="font-semibold text-sm">
                {reviewsData.enjoyedNarrationPercentage}%
              </Text>
              <Text className="text-center font-semibold text-sm">gostaram da narração</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 gap-3">
          <Link
            href={`/books/${bookId}/reviews/book-review`}
            className="w-full rounded-lg border-2 bg-gray-50 py-4 text-center dark:border-0 dark:bg-zinc-900"
          >
            <Text className="font-semibold text-sm">Avalie essa obra</Text>
          </Link>
          {reviewsData.reviews.map((review) => {
            if (review.title === '' && review.content === '') {
              return null;
            }
            return (
              <ReviewCard
                key={review.reviewId}
                title={review.title}
                content={review.content}
                recommended={review.recommended}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
