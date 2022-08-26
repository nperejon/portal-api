import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@database/entities/User.entity";

import jwt from 'jsonwebtoken'
import config from "../config/config";

class AuthController {
    async login (req: Request, res: Response) {
        const { username, password } = req.body;
        try{
            if (!username) return res.status(400).send({ error: "Username is required" })
            if (!password) return res.status(400).send({ error: "Password is required" })

            const user = await getRepository(User).findOne({ where: { username } });
            if(!user) return res.status(400).send({ error: "User doesn't exists" })
            
            if(!user.checkIfUnencryptedPasswordIsValid(password)) return res.status(401).send({ error: "Unauthorized" })
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, config.jwtSecret, {
                expiresIn: "5h"
            })

            return res.status(200).send({ token })
        }catch(err){
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }
    
//   static changePassword = async (req: Request, res: Response) => {
//     //Get ID from JWT
//     const id = res.locals.jwtPayload.userId;

//     //Get parameters from the body
//     const { oldPassword, newPassword } = req.body;
//     if (!(oldPassword && newPassword)) {
//       res.status(400).send();
//     }

//     //Get user from the database
//     const userRepository = getRepository(User);
//     let user: User;
//     try {
//       user = await userRepository.findOneOrFail(id);
//     } catch (id) {
//       res.status(401).send();
//     }

//     //Check if old password matchs
//     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
//       res.status(401).send();
//       return;
//     }

//     //Validate de model (password lenght)
//     user.password = newPassword;
//     const errors = await validate(user);
//     if (errors.length > 0) {
//       res.status(400).send(errors);
//       return;
//     }
//     //Hash the new password and save
//     user.hashPassword();
//     userRepository.save(user);

//     res.status(204).send();
//   };
}
export default AuthController;