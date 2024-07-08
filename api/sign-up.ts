import { SignInDto } from './dto/sign-up.dto';

export async function signUp(body: SignInDto) {
  // Alterar o IP para o IP da sua máquina
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  ).then((res) => res.json());

  if (response.statusCode === 401) {
    throw new Error('Usuário ou senha incorretos!');
  }

  return response;
}
