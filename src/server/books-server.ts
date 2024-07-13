import { api } from './api';
import { Review } from './reviews-server';

export type BookDetails = {
  id: number;
  title: string;
  description: string;
  genres: string[];
  language: string;
  pages: number;
  duration: number;
  publicationYear?: number;
  coverImageUrl?: string;
  ebookFileUrl?: string;
  audiobookFileUrl?: string;
  author: {
    authorId: number;
    name: string;
    avatarUrl: string;
    about: string;
    books: BookCard[];
  };
  reviews: Review[];
};

export type BookCard = {
  id: number;
  title: string;
  author: {
    name: string;
  };
  pages: number;
  duration: number;
  coverImageUrl?: string;
};

async function getById(bookId: string) {
  try {
    const { data } = await api.get<BookDetails>(`/books/${bookId}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getByGenre(genre: string, limit?: number) {
  try {
    const { data } = await api.get<{ books: BookCard[] }>(
      `/books/genres/${genre}?limit=${limit || 10}`,
    );

    return data.books;
  } catch (error) {
    throw error;
  }
}

async function getByRelevance(limit?: number) {
  const { data } = await api.get<{ books: BookCard[] }>(`/books/relevance?limit=${limit || 10}`);

  return data.books;
}

export const booksServer = { getById, getByGenre, getByRelevance };
