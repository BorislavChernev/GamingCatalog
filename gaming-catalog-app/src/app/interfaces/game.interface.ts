import { Rating } from "./rating.interface";
import { Review } from "./review.interface";

export interface Game {
    id: number,
    name: string,
    description: string,
    version?: string,
    releaseDate?: Date,
    ageRestriction: string,
    releaseStatusType: Date,
    supportsPC: boolean,
    supportsPS: boolean,
    supportsXbox: boolean,
    supportsNintendo: boolean,
    imageUrl: string,
    reviews: Review[]
    rating: number,
    likes: number,
    wishes: number,
    ratings: Rating[],
}