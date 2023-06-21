import { RequestWithUserSession } from "../types/util";
import datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { Appointment } from "../schema";
import { randomUUID } from "crypto";


export const listAppointments =async (req :RequestWithUserSession, res :Response) => {
    if(req.user.userType === 1 ) {
        const appointments = await datastore.listPatientAppointment(req.user.id);
        return res.status(StatusCodes.OK).json({ data: appointments})
    } else{
        const date = req.body?.date?req.body.date: Date.now();
        if(!req.body?.clinicId){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'clinicId is required'})
        }
        const appointments = await datastore.listDoctorAppointment(req.body.clinicId, date);
        const clinic = await datastore.getClinic(req.body.clinicId);
        if(req.user.userType === 4 ) {
            const recep = await datastore.getReceptionsit(req.user.id);
            if(recep.doctorId !== clinic.doctorId ){
                return res.status(StatusCodes.FORBIDDEN).json({message: 'not authrized'})
            }
        }else{
            if(clinic.doctorId !== req.user.id){
                return res.status(StatusCodes.FORBIDDEN).json({message: 'not authrized'})
            }
        }
        return res.status(StatusCodes.OK).json({ data: appointments})
    }

}

export const postAppointment =async (req :RequestWithUserSession, res :Response) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const app : Appointment ={
        clinicId: req.body.clinicId,
        patientId: req.user.id,
        date: req.body.date,
        bookedAt: Date.now()
    }
    const clinicSchedule = await datastore.getClinicSchedule(req.body.clinciId);
    const candidateDate = new Date(req.body.date).getDate();
    const isAvailable = clinicSchedule.find(d=>d.day === candidateDate);
    if(! isAvailable ){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `that day not avalilable`});
    }
    await datastore.createAppointment(app);
    res.status(StatusCodes.OK).json({ message: 'appointment booked successfully'})
}

export const deleteAppointment =async (req :RequestWithUserSession, res :Response) => {
    await datastore.deleteDoctorAppointment(req.user.id,req.body.clinicId, req.body.date);
    res.status(StatusCodes.OK).json({ message: 'appointment booked successfully'})
}

export const updateAppointmentDate =async (req :RequestWithUserSession, res :Response) => {
    await datastore.updateAppointmentDate(req.user.id,req.body.clinicId, req.body.date, req.body.newDate);
    res.status(StatusCodes.OK).json({ message: 'appointment booked successfully'})
}