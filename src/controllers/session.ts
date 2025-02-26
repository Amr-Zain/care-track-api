import { StatusCodes } from 'http-status-codes';
import datastore from '../datastore/services';
import { Request, Response } from 'express';
import { createToken } from '../jwt';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Session, User } from '../schema';
import { RequestWithUserSession } from '../types/util';

export const createUserSession = async (req :Request, res:Response)=>{
    //email password
        const {email, password, userType } = req.body;
        //validatePassword
        const user =  await validateUserAndPassword(email, password, userType);
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({ message:'wrong email or password'});
        }
        const withReset = user as UserWithReset;
        if(withReset.userType == 4 && withReset?.reset ){
            res.status(StatusCodes.RESET_CONTENT).json( { 
                message: 'You need to reset your password first',
                url: '/api/v1/users/reset_password'})
        }
        if( userType != user.userType){
            return res.status(StatusCodes.BAD_REQUEST).json({ Message:'wrong userType '})
        }
        // Create a session
        const session: Session = {
            id: crypto.randomUUID(),
            userType: req.body.userType,
            userId: user.id,
            userAgent: req.get('User-Agent'),
            createdAt:  Date.now(),
            lastAccess:  Date.now(),
            valid: true,
        }
        
        
        await datastore.createSession(session);
        // create access token
        const accessToken = createToken({ id: user.id, userType, sessionId: session.id},
                            { expiresIn: process.env.JWT_ACCESS_TTL });
        // create refresh token
        const refreshToken = createToken(session, 
                            { expiresIn: process.env.JWT_REFRESH_TTL });
        // send refresh & access token back user Data
        res.status(StatusCodes.ACCEPTED).json({ user,accessToken, refreshToken });
}

export const  getUserValidSession = async (req :RequestWithUserSession , res :Response)=>{
    const userId = req.user.id
    const userSessions = await datastore.listUserValidsession(userId);
    res.status(StatusCodes.OK).json({ data:userSessions });
}

export const deleteUserSession = async (req :RequestWithUserSession , res :Response)=>{
    const sessionId = req.user.sessionId;
    await datastore.invalidateSession(sessionId);
    res.status(StatusCodes.OK).json({ message: 'logged out' });
}

interface UserWithReset extends User{
    reset :boolean
}
async function validateUserAndPassword (email :string, password :string, userType: number):Promise<(Omit<User,'password'>) | false | UserWithReset> {
    const user = await datastore.getUserByEmail(email);
    if(!user){
        return false;
    }
    if(user.userType == 4 && user.password === process.env.DOMMY_PASSWORD){
        return { ...user, reset: true};
    }
    try{
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) return false;
    }catch(e){
        return false;
    }
    
    delete user.password;
    return user;
}