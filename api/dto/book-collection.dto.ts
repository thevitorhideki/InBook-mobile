export class BookCollectionDto {
  books: {
    id: number;
    title: string;
    author: {
      name: string;
    };
    pages: number;
    duration: number;
    coverImageUrl?: string;
  }[];
}
