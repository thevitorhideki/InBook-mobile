import { api } from './api';

export type ReviewDetails = {
  reviewId: number;
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarration: boolean;
  title?: string;
  content?: string;
  user: {
    username: string;
    avatarUrl?: string;
  };
};

export type CreateReview = {
  enjoyedContent: boolean;
  enjoyedNarration: boolean;
  recommended: boolean;
  title: string;
  content: string;
  user: {
    username: string;
    avatarUrl: string;
  };
};

async function createReview(bookId: string, review: CreateReview) {
  try {
    await api.post(`/books/${bookId}/reviews`, review);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getReviews(bookId: string) {
  try {
    const response = await api.get(`/books/${bookId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const reviewsServer = { createReview, getReviews };
