import { Loading } from '@/components/loading';
import { Header } from '@/components/navigation/Header';
import ReviewCard from '@/components/reviewCard';
import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { ReviewDetails, reviewsServer } from '@/server/reviews-server';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
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
  const { session } = useSession();
  const userId = jwtDecode(session).sub;

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

  const hasReviewed = reviewsData.reviews.some(
    (review) => review.user.id === jwtDecode(session).sub,
  );

  return (
    <View className="px-5">
      <Header title="Avaliações" to={() => router.navigate(`/books/${bookId}`)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center gap-3">
          <Text className="font-semibold text-xl">
            {reviewsData.reviews.length > 1
              ? `Opinião de ${reviewsData.reviews.length} leitores`
              : `Opinião de ${reviewsData.reviews.length} leitor`}
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 items-center">
              <Text className="font-semibold text-base">
                {reviewsData.enjoyedContentPercentage}%
              </Text>
              <Text className="text-center font-semibold text-base">gostaram do conteúdo</Text>
            </View>
            <View className="border-l border-gray-200 dark:border-gray-500" />
            <View className="flex-1 items-center">
              <Text className="font-semibold text-base">{reviewsData.recommendedPercentage}%</Text>
              <Text className="text-center font-semibold text-base">recomendam esse livro</Text>
            </View>
            <View className="border-l border-gray-200 dark:border-gray-500" />
            <View className="flex-1 items-center">
              <Text className="font-semibold text-base">
                {reviewsData.enjoyedNarrationPercentage}%
              </Text>
              <Text className="text-center font-semibold text-base">gostaram da narração</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 gap-3 pb-28">
          {!hasReviewed ? (
            <Link
              href={`/books/${bookId}/reviews/book-review`}
              className="w-full rounded-lg border-2 bg-gray-50 py-4 text-center dark:border-0 dark:bg-zinc-900"
            >
              <Text className="font-semibold text-base">Avalie essa obra</Text>
            </Link>
          ) : null}

          <View className="w-full flex-1 gap-2">
            {hasReviewed ? <Text className="text-left font-semibold">Sua avaliação</Text> : null}
            {reviewsData.reviews.map((review) => {
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

            {reviewsData.reviews.filter((review) => review.user.id !== userId).length !== 0 ? (
              <Text className="text-left font-semibold">Avaliações de outros leitores</Text>
            ) : null}
            {reviewsData.reviews.slice(0, 10).map((review) => {
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
        </View>
      </ScrollView>
    </View>
  );
}
