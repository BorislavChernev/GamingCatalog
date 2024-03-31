import { Game } from "./game.interface";

export interface Creator {
    id: number,
    name: string,
    dateEstablished: Date,
    developedGamesIds: Game[],
}