import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import datastore from '../datastore/services/index';



export const checkDoctorAuth = async (req :Request, res :Response, next :NextFunction) =>{
    const currDate = new Date();
    const date = new Date(currDate.getFullYear(),currDate.getMonth(),currDate.getDay(),0).getTime();
    const appointement = await datastore.getAppointment(req.body.clinicId,date,req.body.patientId)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if(!appointement || appointement.doctorId !== req.user.id){
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'not autrized'})
    }
    next();

}