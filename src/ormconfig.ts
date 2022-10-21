import { DataSource } from "typeorm"
import "dotenv/config"
import "reflect-metadata";
import { Post } from "@database/entities/Post.entity";
import { User } from "@database/entities/User.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: true,
    logging: false,
    entities: [Post, User],
    migrations: [],
    subscribers: [],
})
