export interface Discussion {
  _id: string;
  topic: string;
  description: string;
  datePosted: Date;
  author: string;
  messages: string[];
}
