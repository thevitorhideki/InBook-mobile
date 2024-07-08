import getAllReviews from '@/api/get-all-reviews';
import { useEffect, useState } from 'react';

export const useReviewsDetails = (bookId: string) => {
  const [bookDetails, setBookDetails] = useState({
    reviews: [],
    recommendedPercentage: 0,
    enjoyedContentCount: 0,
    enjoyedNarratorCount: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getAllReviews(bookId);
      const recommendedPercentage = Math.round(
        (reviews.reduce(
          (acc, review) => acc + (review.recommended ? 1 : 0),
          0,
        ) /
          reviews.length) *
          100,
      );
      const enjoyedContentCount = reviews.reduce(
        (acc, review) => acc + (review.enjoyedContent ? 1 : 0),
        0,
      );
      const enjoyedNarratorCount = reviews.reduce(
        (acc, review) => acc + (review.enjoyedNarrator ? 1 : 0),
        0,
      );

      setBookDetails({
        reviews,
        recommendedPercentage,
        enjoyedContentCount,
        enjoyedNarratorCount,
      });
    };

    fetchReviews();
  }, [bookId]);

  return bookDetails;
};
