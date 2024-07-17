import * as SecureStore from 'expo-secure-store';
import { api } from './api';

type SignInBody = {
  username: string;
  password: string;
};

type SignUpBody = {
  email: string;
} & SignInBody;

async function signIn(body: SignInBody): Promise<{ access_token: string; refresh_token: string }> {
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
    session = await SecureStore.getItemAsync('session');
    refresh_token = await SecureStore.getItemAsync('refresh_token');
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
