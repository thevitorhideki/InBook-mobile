import { ReviewDetailsDto } from './review-details.dto';

export class BookDetailsDto {
  title: string;
  description: string;
  genres: string[];
  language: string;
  pages: number;
  duration: number;
  publicationYear?: number;
  coverImageUrl?: string;
  ebookFileUrl?: string;
  audiobookFileUrl?: string;
  author: {
    authorId: number;
    name: string;
    avatarUrl: string;
    about: string;
  };
  reviews: ReviewDetailsDto[];
  reviewsCount: number;
}
