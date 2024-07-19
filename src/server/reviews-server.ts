import * as SecureStore from 'expo-secure-store';
import { api } from './api';

export type ReviewDetails = {
  reviewId: number;
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarration: boolean;
  title?: string;
  content?: string;
  user: {
    id: string;
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
};

async function createReview(bookId: string, review: CreateReview) {
  let token = '';

  try {
    token = await SecureStore.getItemAsync('session');
  } catch (error) {
    console.error(error);
  }

  try {
    await api.post(`books/${bookId}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error('Dados inválidos');
    } else if (error.response.status === 409) {
      throw new Error('Você já avaliou este livro');
    }
    throw new Error(error);
  }
}

async function getReviews(bookId: string) {
  try {
    const response = await api.get(`books/${bookId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const reviewsServer = { createReview, getReviews };
