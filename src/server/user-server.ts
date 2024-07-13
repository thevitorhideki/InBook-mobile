import AsyncStorage from '@react-native-async-storage/async-storage';
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

async function getUserData(): Promise<UserData> {
  let token = '';

  try {
    token = await AsyncStorage.getItem('session');
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
    throw new Error(error);
  }
}

export const userServer = { getUserData };
