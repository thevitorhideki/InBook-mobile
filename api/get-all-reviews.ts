import { ReviewDetailsDto } from './dto/review-details.dto';

export default async function getAllReviews(
  bookId: string,
): Promise<ReviewDetailsDto[]> {
  const response = await fetch(
    `http://${process.env.EXPO_PUBLIC_IP}:3333/books/${bookId}/reviews`,
  ).then((res) => res.json());

  return response;
}
