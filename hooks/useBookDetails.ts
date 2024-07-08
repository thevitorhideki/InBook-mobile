// hooks/useBookDetails.js
import { getAuthorById } from '@/api/get-author-by-id';
import { getBookById } from '@/api/get-book-by-id';
import { useEffect, useState } from 'react';

export const useBookDetails = (bookId: string) => {
  const [bookDetails, setBookDetails] = useState({
    coverUrl: 'https://images.unsplash.com/photo-1612830725324-4b3b3b3b3b3b',
    title: '',
    author: {
      authorId: 0,
      name: '',
      avatarUrl: '',
      about: '',
      books: [],
    },
    duration: 0,
    pages: 0,
    reviewCount: 0,
    reviews: [],
    recommendedPercentage: 0,
    enjoyedContentPercentage: 0,
    enjoyedNarrationPercentage: 0,
    description: '',
  });

  useEffect(() => {
    const handleBookDetails = async () => {
      try {
        const bookDetails = await getBookById(bookId);
        const authorDetails = await getAuthorById(bookDetails.author.authorId);
        const recommendedCount = bookDetails.reviews.reduce(
          (acc, review) => acc + (review.recommended ? 1 : 0),
          0,
        );

        setBookDetails({
          coverUrl: bookDetails.coverImageUrl,
          title: bookDetails.title,
          author: {
            authorId: bookDetails.author.authorId,
            name: authorDetails.name,
            avatarUrl: authorDetails.avatarUrl,
            about: authorDetails.about,
            books: authorDetails.books,
          },
          duration: bookDetails.duration,
          pages: bookDetails.pages,
          reviewCount: bookDetails.reviewsCount,
          reviews: bookDetails.reviews,
          recommendedPercentage: Math.round(
            (recommendedCount / bookDetails.reviewsCount) * 100,
          ),
          enjoyedContentPercentage: Math.round(
            (bookDetails.reviews.reduce(
              (acc, review) => acc + (review.enjoyedContent ? 1 : 0),
              0,
            ) /
              bookDetails.reviewsCount) *
              100,
          ),
          enjoyedNarrationPercentage: Math.round(
            (bookDetails.reviews.reduce(
              (acc, review) => acc + (review.enjoyedNarrator ? 1 : 0),
              0,
            ) /
              bookDetails.reviewsCount) *
              100,
          ),
          description: bookDetails.description,
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleBookDetails();
  }, [bookId]);

  return bookDetails;
};
