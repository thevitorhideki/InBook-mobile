import { BookCollectionDto } from './dto/book-collection.dto';

export async function getBookByGenre(
  genre: string,
  limit?: number,
): Promise<BookCollectionDto> {
  // Alterar o IP para o IP da sua máquina
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/books/genres/${genre}?limit=${
      limit || 10
    }`,
  ).then((res) => res.json());

  return response;
}
