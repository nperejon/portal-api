import { User } from "@entities/User";
import { Request, Response } from "express";
import { resolve } from 'path'
import { unlink } from 'fs'
import { getRepository } from "typeorm";
import IAuthorizedUser from '../interfaces/AuthorizedUser.interface'


class AvatarController {
    async getAvatar(req: Request, res: Response){
        const id = parseInt(req.params.id) // puxar do db
        try{
            if(!id) return res.status(500).send({ error: 'User id is required' })
            const user = await getRepository(User).findOne({ id })
            res.status(200).sendFile(resolve('uploads', user.avatar))
        }catch(err){
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }
    
    async uploadAvatar(req: Request, res: Response){
        const authorizedUser: IAuthorizedUser = res.locals.authorizedUser
        const uploadImage = req.file
        try{
            if(uploadImage.filename.length > 50) {
                unlink(uploadImage.path, (err) => console.log(err))
                return res.status(500).send({ error: 'Image name is too large' })
            }

            await getRepository(User).update(authorizedUser.id, {
                avatar: uploadImage.filename
            })
            return res.status(200).json({ sucess: 'Avatar has been changed' })
        }catch(err){
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    async deleteAvatar(req: Request, res: Response){
        
    }
}

export default AvatarController