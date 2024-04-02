export interface Game {
  id: string;
  name: string;
  description: string;
  version?: string;
  releaseDate?: Date;
  ageRestriction: string;
  releaseStatusType: string;
  supportsPC: boolean;
  supportsPS: boolean;
  supportsXbox: boolean;
  supportsNintendo: boolean;
  imageUrl: string;
}
