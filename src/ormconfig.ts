import { DataSource } from "typeorm"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})