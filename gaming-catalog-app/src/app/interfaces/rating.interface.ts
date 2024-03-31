import { Game } from "./game.interface";

export interface Rating {
    id: number,
    points: number,
    user: number,
    game: Game,

}