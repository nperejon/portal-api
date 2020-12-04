import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try{
    const bearerToken = req.headers["authorization"];
    if(!bearerToken) return res.status(401).send({ error: 'Unauthorized' })
    const authToken = bearerToken.split(' ')[1]
    const authorizedUser = jwt.verify(authToken, config.jwtSecret)
    res.locals.authorizedUser = authorizedUser
    next();
  }catch(err){
    return res.status(401).send({ error: 'Unauthorized' })
  }
};