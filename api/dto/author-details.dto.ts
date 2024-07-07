export class AuthorDetailsDto {
  name: string;
  avatarUrl?: string;
  about?: string;
  birthYear?: number;
  nationality?: string;
  books: {
    title: string;
    pages: number;
    duration: number;
    coverImageUrl?: string;
  }[];
}
