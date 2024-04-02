import { Game } from './game.interface';

export interface Review {
  id: number;
  description: string;
  type: string;
  likes: number;
  dislikes: number;
  author: number;
  gameId: number;
}
