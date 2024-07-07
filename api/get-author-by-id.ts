import { AuthorDetailsDto } from './dto/author-details.dto';

export async function getAuthorById(
  authorId: number,
): Promise<AuthorDetailsDto> {
  // Alterar o IP para o IP da sua máquina
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/authors/${authorId}`,
  ).then((res) => res.json());

  if (response.statusCode === 401) {
    throw new Error('O autor não foi encontrado');
  }

  return response;
}
