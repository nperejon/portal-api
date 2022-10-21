import { Post } from "./Post";

export class User {
    id: number;
    avatar: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
    level: number;
    posts: Post[];
}