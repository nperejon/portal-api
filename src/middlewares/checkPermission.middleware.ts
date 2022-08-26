import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "@database/entities/User.entity";

export const checkPermission = async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.authorizedUser.id;
    try {
      const user = await getRepository(User).findOne(id);
      if(user.id < 3) return res.status(401).send({ error: 'No permission' })
      next()
    } catch (err) {
      res.status(401).send({ error: 'No permission' });
    }
};