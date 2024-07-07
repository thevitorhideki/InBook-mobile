export class ReviewDetailsDto {
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarrator: boolean;
  title?: string;
  content?: string;
  user: {
    username: string;
    avatarUrl?: string;
  };
}
