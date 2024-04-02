import { ratingClass } from 'src/app/features/ratingClass';
import { reviewClass } from 'src/app/features/reviewClass';
import { wishClass } from 'src/app/features/wishClass';

export class GameClass {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public ageRestriction: string,
    public releaseStatusType: string,
    public supportsPC: boolean,
    public supportsPS: boolean,
    public supportsXbox: boolean,
    public supportsNintendo: boolean,
    public imageUrl: string,
    public reviews: reviewClass[],
    public rating: ratingClass[],
    public likes: wishClass[],
    public wishes: wishClass[],
    public ratings: ratingClass[],
    public version?: string,
    public releaseDate?: Date
  ) {}

  calculateRating(): number {
    if (this.ratings.length !== 0) {
      const totalPoints = this.ratings.reduce(
        (acc, curr) => acc + curr.points,
        0
      );
      return totalPoints / this.ratings.length;
    } else {
      return 0;
    }
  }
}
