import { api } from './api';

export type AuthorDetails = {
  name: string;
  avatarUrl?: string;
  about?: string;
  birthYear?: number;
  nationality?: string;
  books: {
    id: number;
    title: string;
    pages: number;
    duration: number;
    coverImageUrl?: string;
  }[];
};

async function getById(authorId: number) {
  try {
    const { data } = await api.get<AuthorDetails>(`/authors/${authorId}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const authorsServer = { getById };
