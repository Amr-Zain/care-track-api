import { DoctorData } from "../schema/doctor-nurse";
import { RequestWithUserSession } from "../types/util";
import Datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { pool } from '../datastore/connect';

const datastore = new Datastore(pool);

export const createDoctorData =async (req :RequestWithUserSession, res :Response) => {
    const doctorData :DoctorData= {
        userId: req.user.id,
        specialization: req.body.specialization,
        fees: req.body.fees,
        appointmentTime: req.body.appointmentTime,
        description: req.body.description,
    }
    await datastore.createDoctorNurseData(doctorData);
    res.status(StatusCodes.CREATED).json({ message:'Doctor Data created'})
}
export const getDoctor =async ( req :RequestWithUserSession, res :Response) => {
    let id = req.params.id;
    if( !id ){
        id = req.user.id;
        if(!id)res.status(StatusCodes.BAD_REQUEST).json({ message: 'id field is required' })
    }

    const doctor = await datastore.getDotor(id);
    const clinics = await datastore.listDoctorClinics(doctor.id);
    //add the clinics
    doctor['clinics'] = clinics;
    res.status(StatusCodes.OK).json({ data: doctor })
}
export const updateDoctorData =async(req :RequestWithUserSession, res :Response) =>{
    const doctorData: DoctorData = {
        userId: req.user.id,
        fees: req.body.fees,
        description: req.body.description,
        appointmentTime: req.body.appointmentTime,
        specialization: req.body.specialization
    }
    await datastore.updateDoctorNurseData(doctorData);
    res.status(StatusCodes.ACCEPTED).json({ messsage:'doctor data updated'})
}