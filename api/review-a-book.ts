import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateReviewDto } from './dto/create-review.dto';

export default async function ReviewABook(
  bookId: string,
  body: CreateReviewDto,
) {
  const getToken = async () => {
    try {
      const userTokens = await AsyncStorage.getItem('tokens');
      return userTokens != null ? JSON.parse(userTokens) : null;
    } catch (error) {
      console.error('Erro ao obter o token do usuário:', error);
    }
  };

  const tokens = await getToken();

  if (!tokens || !tokens.access_token) {
    throw new Error('Usuário não logado');
  }

  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/books/${bookId}/reviews`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Dados inválidos');
    }
    if (response.status === 401) {
      throw new Error('Usuário não logado');
    }
    if (response.status === 409) {
      throw new Error('Você já avaliou este livro');
    }
  }
}
