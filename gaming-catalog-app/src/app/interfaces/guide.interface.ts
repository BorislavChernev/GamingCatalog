import { Game } from "./game.interface";

export interface Guide {
    id: number,
    titles: string,
    description: string,
    language: string,
    category: string,
    game: Game,
    writerId: string
}