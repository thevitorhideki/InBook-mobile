import { useThemeColor } from '@/hooks/useThemeColor';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import ReviewCard from '../ReviewCard';
import Text from '../Text';
import VerticalLine from '../VerticalLine';

export default function Reviews({ bookDetails, bookId }) {
  const themeCardStyle = useThemeColor({}, 'card');
  const themeBorderStyle = useThemeColor({}, 'border');

  return (
    <View style={{ alignItems: 'center', marginBottom: 22 }}>
      {bookDetails.reviewCount === 0 ? (
        <Link
          href={`/books/${bookId}/reviews/book-review`}
          style={[
            styles.reviewButton,
            {
              backgroundColor: themeCardStyle,
              borderColor: themeBorderStyle,
            },
          ]}
        >
          <Text weight="bold" fontSize={12}>
            Seja o primeiro a avaliar essa obra
          </Text>
        </Link>
      ) : (
        <>
          <Text weight="bold" fontSize={14}>
            {bookDetails.reviewCount > 1
              ? `Opinião de ${bookDetails.reviewCount} leitores`
              : `Opinião de ${bookDetails.reviewCount} leitor`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 24,
              marginTop: 12,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text weight="bold" fontSize={12}>
                {bookDetails.enjoyedContentPercentage}%
              </Text>
              <Text weight="bold" fontSize={12}>
                gostaram do conteúdo
              </Text>
            </View>
            <VerticalLine />
            <View style={{ alignItems: 'center' }}>
              <Text weight="bold" fontSize={12}>
                {bookDetails.enjoyedNarrationPercentage}%
              </Text>
              <Text weight="bold" fontSize={12}>
                gostaram da narração
              </Text>
            </View>
          </View>
          <View
            style={{
              gap: 8,
              marginTop: 16,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Link
              href={`/books/${bookId}/reviews/book-review`}
              style={[
                styles.reviewButton,
                {
                  backgroundColor: themeCardStyle,
                  borderColor: themeBorderStyle,
                },
              ]}
            >
              <Text weight="bold" fontSize={12}>
                Avalie essa obra
              </Text>
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
            {bookDetails.reviewCount > 10 ? (
              <Link
                href={`/books/${bookId}/reviews/all-reviews`}
                style={[
                  styles.reviewButton,
                  {
                    backgroundColor: themeCardStyle,
                    borderColor: themeBorderStyle,
                  },
                ]}
              >
                <Text weight="bold" fontSize={12}>
                  Ver todas as avaliações
                </Text>
              </Link>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewButton: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderRadius: 8,
  },
});
