import { Post } from "@entities/Post";
import { User } from "@entities/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import IAuthorizedUser from '../interfaces/AuthorizedUser.interface'

class PostController {
    async find(req: Request, res: Response) {
        const posts = await getRepository(Post).find({})
        res.status(200).send(posts)
    }

    async findByUser(req: Request, res: Response){
        const { id } = req.params
        try{
            const user = await getRepository(User).findOne(id, { relations: ['posts'] })

            if(!user) return res.status(500).send({ error: "User don't exists"})

            const userData = {
                id: user.id,
                username: user.username,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                posts: user.posts.map((post: Post) => {
                    return {
                        id: post.id,
                        title: post.title,
                        description: post.description
                    }
                })
            }

            return res.status(200).send(userData)
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    // async findById(req: Request, res: Response){}

    async create(req: Request, res: Response){
        const authorizedUser: IAuthorizedUser = res.locals.authorizedUser
        try{
            const post = new Post()
            post.title = "Post 1"
            post.description = "Description post 1"
            post.content = "Content post 1"

            const user = await getRepository(User).findOne({ id: authorizedUser.id })
            post.author = user
            
            await getRepository(Post).save(post)
            return res.status(201).send({})
        }catch(err){
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    // async delete(req: Request, res: Response){}
}

export default PostController