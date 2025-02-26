import { RequestWithUserSession } from "../types/util";
import Datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { Clinic, Receptionsit, User } from "../schema";
import crypto from "crypto";
import { pool } from '../datastore/connect';

const datastore = new Datastore(pool);

export const createReceptionsit =async (req :RequestWithUserSession, res :Response) => {
    const recep = req.body;
    recep.createdAt = Date.now();
    recep.id = crypto.randomUUID();
    recep.password = process.env.DUMMY_PASSWORD
    recep.userType = 4;
    recep.clinicId = req.body.clinicId
    
    /* const doesEmailexist = await datastore.getUserByEmail(recep.email);
    if(doesEmailexist){
        res.status(StatusCodes.CONFLICT).json({message: 'this email already exist'});
        return;
    }
    const doesPhoneexist = await datastore.getUserByPhone(recep.phone);
    if(doesPhoneexist){
        res.status(StatusCodes.CONFLICT).json({message: 'this phone already exist'});
        return;
    } */
    
    await datastore.createUser(recep);
    await datastore.createReceptionsit(recep.clinicId, recep.id, req.user.id)
    res.status(StatusCodes.OK).json({  message: 'receptionist created' });
}
/* export const addExistingReceptionsist =async (req :RequestWithUserSession, res :Response) => {
    const recep = await datastore.isReceptionsitOfDoctor(req.user.id, req.body.email);
    console.log(req.user.id)
    if(!recep){
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Not Authirzed or Receptionist not exist'});
    }
    const clinic = await datastore.getClinic(req.params.clinicId);
    if(!clinic){
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'clinic not exist'})
    }
    if(clinic.doctorId !== req.user.id) {
        res.status(StatusCodes.FORBIDDEN).json( { message: 'Not Authirzed'})
    }
    if(req.params.clinicId === recep.clinicId ){
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Receptionist alrady exist in the clinic'})
    }
    
    await datastore.createReceptionsit(clinic.id, recep.id)
    res.status(StatusCodes.OK).json({  message: 'receptionist created' });
} */
export const getReceptionsit =async (req :RequestWithUserSession, res :Response) => {
    const receptionist = await datastore.getReceptionsit(req.params.receptionsitId);
    if(!receptionist){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'receptionsist doe\'nt exist'})
    }
    res.status(StatusCodes.OK).json( { data: receptionist })
}
export const listReceptionsits =async (req :RequestWithUserSession, res :Response) => {
    const receptionists = await datastore.listReceptionsits(req.user.id);
    if(receptionists.length === 0 ){
        res.status(StatusCodes.NO_CONTENT).json( { message: 'there is no receptionsits exist', data: [] });
    }
    res.status(StatusCodes.OK).json( { data: receptionists });
}
export const deleteReceptionsit =async (req :RequestWithUserSession, res :Response) => {
    const receptionist = await datastore.getReceptionsit(req.params.receptionsitId);
    if(!receptionist){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'receptionsist doe\'nt exist'})
    }
    await datastore.deleteReceptionsit( req.user.id, receptionist.id);
    res.status(StatusCodes.OK).json({ message: 'receptionist deleted'})
}