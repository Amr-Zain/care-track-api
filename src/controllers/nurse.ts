import { DoctorData, NurseData } from "../schema/doctor-nurse";
import { RequestWithUserSession } from "../types/util";
import Datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { pool } from '../datastore/connect';

const datastore = new Datastore(pool);

export const createNurseData =async (req :RequestWithUserSession, res :Response) => {
    const nurseData :NurseData= {
        userId: req.user.id,
        fees: req.body.fees,
        description: req.body.description,
        location: req.body.location
    }
    await datastore.createDoctorNurseData(nurseData);
    res.status(StatusCodes.CREATED).json({ message:'Nurse Data created'})
}
export const getNurse =async ( req :RequestWithUserSession, res :Response) => {
    let  id  = req.params?.id;
    if( !id ){
        console.log(req.user)
        id = req.user.id;
        if(!id)res.status(StatusCodes.BAD_REQUEST).json({ message: 'id field is required' })
    }

    const doctor = await datastore.getNurse(id);
    res.status(StatusCodes.OK).json({ data: doctor })
}
export const updateNurseData =async(req :RequestWithUserSession, res :Response) =>{
    const doctorData: NurseData = {
        userId: req.user.id,
        fees: req.body.fees,
        description: req.body.description,
        location: req.body.location
    }
    await datastore.updateDoctorNurseData(doctorData);
    res.status(StatusCodes.ACCEPTED).json({ messsage:'doctor data updated'})
}