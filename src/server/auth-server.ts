import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

type SignInBody = {
  username: string;
  password: string;
};

type SignUpBody = {
  email: string;
} & SignInBody;

async function signIn(body: SignInBody) {
  try {
    const response = await api.post('auth/login', body);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function signUp(body: SignUpBody) {
  try {
    const response = await api.post('auth/register', body);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function refreshToken() {
  let refresh_token = '';
  let session = '';

  try {
    session = await AsyncStorage.getItem('session');
    refresh_token = await AsyncStorage.getItem('refresh_token');
  } catch (error) {
    throw new Error(error);
  }

  try {
    const response = await api.post(
      'auth/refresh',
      { refresh_token },
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const authServer = { signIn, signUp, refreshToken };
