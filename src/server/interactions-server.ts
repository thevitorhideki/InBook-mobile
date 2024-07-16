import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import { BookCard } from './books-server';
import { InteractionType } from './enums/interaction';

export type InteractionsByUser = {
  SAVED: {
    books: BookCard[];
  };
  DOWNLOADED: {
    books: BookCard[];
  };
  READ: {
    books: BookCard[];
  };
  READING: {
    books: BookCard[];
  };
};

async function getInteractionsByUser(): Promise<InteractionsByUser> {
  let session = '';

  try {
    session = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    const { data } = await api.get('interactions', {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getInteractionsByUserAndBook(bookId: number): Promise<InteractionType[]> {
  let session = '';

  try {
    session = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    const { data } = await api.get(`interactions/${bookId}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function createInteraction(bookId: number, type: InteractionType) {
  let session = '';

  try {
    session = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    await api.post(
      `interactions/${bookId}?type=${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function removeInteraction(bookId: number, type: InteractionType) {
  let session = '';

  try {
    session = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    await api.delete(`interactions/${bookId}?type=${type}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export const interactionsServer = {
  createInteraction,
  getInteractionsByUserAndBook,
  getInteractionsByUser,
  removeInteraction,
};
