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
    throw error;
  }
}

async function signUp(body: SignUpBody) {
  try {
    const response = await api.post('auth/register', body);

    return response.data;
  } catch (error) {
    if (error.response.data.message === 'Username already exists') {
      throw new Error('Username already exists');
    } else if (error.response.data.message === 'Email already exists') {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

async function refreshToken(
  refresh_token: string,
): Promise<{ access_token: string; refresh_token: string }> {
  try {
    const response = await api.post('auth/refresh', { refresh_token });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const authServer = { signIn, signUp, refreshToken };
