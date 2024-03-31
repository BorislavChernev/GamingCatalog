import { Creator } from "./creator.interface";
import { Message } from "./message.interface";

export interface Discussion {
    id: number,
    topic: string,
    description: string,
    datePosted: Date,
    pinned: boolean,
    creator: Creator,
    participantsIds: number[],
    messages: Message[]
}