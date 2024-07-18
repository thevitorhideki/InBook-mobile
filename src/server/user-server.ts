import * as SecureStore from 'expo-secure-store';
import { api } from './api';

export type UserData = {
  id: string;
  username: string;
  email: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
};

export type ProfileData = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

async function getUserData(): Promise<UserData> {
  let token = '';

  try {
    token = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    const response = await api.get('/account', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('Sessão expirada');
    }
    throw new Error(error);
  }
}

async function createProfile(body: ProfileData) {
  let token = '';

  try {
    token = await SecureStore.getItemAsync('session');
  } catch (error) {
    throw new Error(error);
  }

  try {
    await api.post('account/profile', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export const userServer = { getUserData, createProfile };
