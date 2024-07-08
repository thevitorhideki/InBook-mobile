import ReviewCard from '@/components/ReviewCard';
import Text from '@/components/Text';
import VerticalLine from '@/components/VerticalLine';
import { useReviewsDetails } from '@/hooks/useReviewsDetails';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Reviews() {
  const { bookId } = useLocalSearchParams();
  const reviews = useReviewsDetails(bookId as string);
  const themeCardStyle = useThemeColor({}, 'card');
  const themeBorderStyle = useThemeColor({}, 'border');

  const enjoyedContentPercentage = Math.round(
    (reviews.enjoyedContentCount / reviews.reviews.length) * 100,
  );

  const enjoyedNarratorPercentage = Math.round(
    (reviews.enjoyedNarratorCount / reviews.reviews.length) * 100,
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Text weight="bold" fontSize={14}>
          {reviews.reviews.length > 1
            ? `Opinião de ${reviews.reviews.length} leitores`
            : `Opinião de ${reviews.reviews.length} leitor`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text weight="bold" fontSize={12}>
              {enjoyedContentPercentage}%
            </Text>
            <Text weight="bold" fontSize={12} style={{ textAlign: 'center' }}>
              gostaram do conteúdo
            </Text>
          </View>
          <VerticalLine />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text weight="bold" fontSize={12}>
              {reviews.recommendedPercentage}%
            </Text>
            <Text weight="bold" fontSize={12} style={{ textAlign: 'center' }}>
              recomendam esse livro
            </Text>
          </View>
          <VerticalLine />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text weight="bold" fontSize={12}>
              {enjoyedNarratorPercentage}%
            </Text>
            <Text weight="bold" fontSize={12} style={{ textAlign: 'center' }}>
              gostaram da narração
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 10 }}>
        <Link
          href={`/books/${bookId}/reviews/book-review`}
          style={{
            width: '100%',
            textAlign: 'center',
            paddingVertical: 14,
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: themeCardStyle,
            borderColor: themeBorderStyle,
          }}
        >
          <Text weight="bold" fontSize={12}>
            Avalie essa obra
          </Text>
        </Link>
        {reviews.reviews.map((review) => {
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
