/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Router } from 'express'

class App {
    public app: Application
    private port: number

    constructor(routes: Router, middlewares: Array<any>, port: number){
        this.app = express();
        this.setMiddlewares(middlewares)
        this.setRoutes(routes)
        this.port = port
    }

    private setMiddlewares(middlewares: Array<any>){
        middlewares.forEach(middleware => {
                this.app.use(middleware)
            }
        )
    }

    private setRoutes(routes: Router){
        this.app.use(routes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("[*] Servidor iniciando...")
        })
    }

}

export default App;