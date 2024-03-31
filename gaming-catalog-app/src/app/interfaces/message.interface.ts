import { Discussion } from "./discussion.interface";

export interface Message {
    id: number,
    discussion: Discussion,
    senderId: number,
    content: string,
    timeStamp: Date
}