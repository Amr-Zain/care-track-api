import { Request, Response, NextFunction } from "express"
import { StatusCodes } from 'http-status-codes';

const requireUser =(req :Request, res :Response,next :NextFunction)=>{
    const user = req['user'];
    if(!user){
        return res.status( StatusCodes.FORBIDDEN ).json({ message: 'not authrized'});
    }
    next();
}
export default requireUser;