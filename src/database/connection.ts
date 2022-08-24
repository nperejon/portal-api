import "reflect-metadata";
import { createConnection } from "typeorm";

export default createConnection()
.then(async () => {
    console.log("[*] Database conectado")
})
.catch(error => console.log(error));