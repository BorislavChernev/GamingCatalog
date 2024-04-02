export class reviewClass {
  constructor(
    public id: number,
    public description: string,
    public type: string,
    public likes: number,
    public dislikes: number,
    public authorId: string,
    public gameId: number
  ) {}
}
