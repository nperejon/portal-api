import "reflect-metadata";
import { createConnection } from "typeorm";

export default createConnection()
.then(async connection => {
    console.log("[*] Database conectado")
})
.catch(error => console.log(error));