import { User } from "./User";

export class Post {
    id: number;
    title: string;
    description: string;
    content: string;
    tags: string[];
    author: User;
}