import { BookDetailsDto } from './dto/book-details.dto';

export async function getBookById(bookId: string): Promise<BookDetailsDto> {
  // Alterar o IP para o IP da sua máquina
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/books/${bookId}`,
  ).then((res) => res.json());

  if (response.statusCode === 401) {
    throw new Error('O livro não foi encontrado');
  }

  return response;
}
