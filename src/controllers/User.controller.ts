import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from 'src/entities/User'
import { validate } from 'class-validator';
import IAuthorizedUser from '../interfaces/AuthorizedUser.interface'

class UserController {
    async list(req: Request, res: Response) {
        try{
            const users = await getRepository(User).find()
            users.forEach(user => {
                delete user.password
            })
            return res.status(200).send(users)
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params
        try{
            const user = await getRepository(User).findOne(id)
            if(!user) return res.status(500).send({ error: "User don't exists"})

            const userData = {
                id: user.id,
                username: user.username,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                level: user.level,
            }

            return res.status(200).send(userData)
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    async create(req: Request, res: Response) {
        const { username, firstName, lastName, email, password, role } = req.body
        const authorizedUser: IAuthorizedUser = res.locals.authorizedUser
        try{
            const hasEmail = await getRepository(User).findOne({ email })
            const hasUsername = await getRepository(User).findOne({username})
            if(hasEmail) return res.status(500).send({ error: 'Already exists an user with this e-mail' })
            if(hasUsername) return res.status(500).send({ error: 'Already exists an user with this username' })

            const user = new User();
            user.username = username
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.password = password

            /* verify user request role */
            if(authorizedUser){
                const requester = await getRepository(User).findOne(authorizedUser.id)
                const requesterRole = requester.role
                if(requesterRole >= 3) user.role = role
            }
            
            const errors = await validate(user);
            if(errors.length > 0){
                return res.status(500).send(errors.map(error => error.constraints))
            }
            user.hashPassword()

            await getRepository(User).save(user)
            
            delete user.password
            return res.status(201).send(user)
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }

    async edit(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const authorizedUser: IAuthorizedUser = res.locals.authorizedUser
        const { username, firstName, lastName, email, role, level } = req.body
        try{
            if(!username) return res.status(500).send({ error: 'Username is required' })
            if(!firstName || !lastName) return res.status(500).send({ error: 'Name is required' })
            if(!email) return res.status(500).send({ error: 'E-mail is required' })

            const hasEmail = await getRepository(User).findOne({ email })
            const hasUsername = await getRepository(User).findOne({username})
            if(hasEmail && hasEmail.id != id) return res.status(500).send({ error: 'Already exists an user with this e-mail' })
            if(hasUsername && hasUsername.id != id) return res.status(500).send({ error: 'Already exists an user with this username' })

            const user = new User();
            user.username = username
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            
            /* verify user request role */
            const requester = await getRepository(User).findOne(authorizedUser.id)
            const requesterRole = requester.role
            if(requesterRole >= 3) {
                if(role) user.role = role
                if(level) user.level = level
            }
            
            await getRepository(User).update(id, user)
            
            return res.status(200).send(user)
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }
    
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try{
            const userDeleted = await getRepository(User).delete(id)
            if(userDeleted.affected == 0) return res.status(500).send({ error: 'There has no users with this id' })
            return res.status(200).send({ success: 'User deleted.' })
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'An error has ocurred' });
        }
    }
}

export default UserController