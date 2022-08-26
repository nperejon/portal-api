import App from './app';
import express from 'express'
import cors from 'cors'
import routes from './routes'
import { AppDataSource } from './ormconfig';

AppDataSource.initialize().then(() => console.log("Banco de dados conectado"))
const middlewares = [
    cors(),
    express.json(),
    express.urlencoded({ extended: false }),
]

const app = new App(routes, middlewares, 3000)

app.listen()