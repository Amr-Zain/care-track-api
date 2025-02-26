import { RequestWithUserSession } from "../types/util";
import Datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { Appointment, Clinic, ClinicSchedule, Receptionsit, User } from "../schema";
import crypto from "crypto";
import { pool } from '../datastore/connect';

const datastore = new Datastore(pool);

export const createClinic =async (req :RequestWithUserSession, res :Response) => {
    const clinic: Clinic = {
        id: crypto.randomUUID(),
        doctorId: req.user.id,
        clinicName: req.body.clinicName,
        location: req.body.location,
        phone: req.body.phone,
        city: req.body.city,
        appointmentTime: 0
    }
    await datastore.addClinic(clinic);
    res.status(StatusCodes.CREATED).json({ message:'clinic created'})
}
/* export const getClinic =async ( req :RequestWithUserSession, res :Response) => {
    
    res.status(StatusCodes.OK).json({ message:'Doctor Data created'})
} */
export const listClinics =async ( req :RequestWithUserSession, res :Response) => {
    const clinics = await datastore.listDoctorClinics(req.user.id);
    res.status(StatusCodes.OK).json({ data: clinics })
}
export const deleteClinic =async ( req :RequestWithUserSession, res :Response) => {
    const clinic: Clinic = await datastore.getClinic(req.params.id);
    if(clinic.doctorId !== req.user.id){
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'not authrized'})
    }
    await datastore.deleteClinic(req.params.id);
    res.status(StatusCodes.ACCEPTED).json({ message:'clinic deleted' })
}
export const updateClinic =async ( req :RequestWithUserSession, res :Response) => {
    const clinic: Clinic = {
        id: req.params.id,
        doctorId: req.user.id,
        clinicName: req.body.clinicName,
        location: req.body.location,
        phone: req.body.phone,
        city: req.body.city,
        appointmentTime: 0
    }
    const oldData: Clinic = await datastore.getClinic(req.params.id);
    if(oldData.doctorId !== req.user.id){
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'not authrized'})
    }
    await datastore.updateClinic(clinic)
    res.status(StatusCodes.ACCEPTED).json({ message:'clinic Data updated' });
}
export const postClinicSchedule =async (req :RequestWithUserSession, res :Response) => {
    const clinic = await datastore.getClinic(req.params.clinicId);
    if(!clinic){
        res.status(StatusCodes.BAD_REQUEST).json({message: 'clinic not exist'});
    }
    if(clinic.doctorId !== req.user.id){
        res.status(StatusCodes.FORBIDDEN).json({ message: 'not authrized to post clinic schedule'})
    }
    await datastore.postClinicSchedule(req.body.days,req.params.clinicId)
}
export const getClinicSchedule =async (req :RequestWithUserSession, res :Response) => {
    const schedule = datastore.getClinicSchedule(req.params.clinicId);
    res.status(StatusCodes.OK).json({ data: schedule });
}
export const addDay =async (req :RequestWithUserSession, res :Response) => {
    const clinic = await datastore.getClinic(req.params.clinicId);
    if(!clinic){
        res.status(StatusCodes.BAD_REQUEST).json({message: 'clinic not exist'});
    }
    if(clinic.doctorId !== req.user.id){
        res.status(StatusCodes.FORBIDDEN).json({ message: 'not authrized to post clinic schedule'})
    }
    await datastore.postDayToSchedule({from: req.body.from,to:req.body.to, clinicId: req.params.clinicId, day:req.body.day});
    res.status(StatusCodes.OK).json({ message: 'A day added successfully'})
}
export const updateDay =async (req :RequestWithUserSession, res :Response) => {
    const schedule = datastore.getClinicSchedule(req.params.clinicId);
    res.status(StatusCodes.OK).json({ data: schedule });
}
export const deleteDay =async (req :RequestWithUserSession, res :Response) => {
    const schedule = datastore.getClinicSchedule(req.params.clinicId);
    res.status(StatusCodes.OK).json({ data: schedule });
}

export const getAvailableAppointments  = async (req :RequestWithUserSession, res :Response) => {
    //first see if the day the doctor will be in there
    //second if so get the all reservations and mark as not available and send the reset of them
    const time = new Date(req.body.date);
    const schedule = await datastore.getClinicSchedule(req.params.clinicId);
    //const day :ClinicSchedule = schedule.find((d=>d.day == time.getDay()))
    
    const clinic  = await datastore.getClinic(req.params.clinciId)
    const AppointmentsScheduleINWeek = [];
    for(let i =0;i<7;i++){
        const day :ClinicSchedule = schedule.find((d=>d.day == i))
        if(!day)AppointmentsScheduleINWeek.push(null);
        else{
            const date =  new Date(time.getFullYear(),time.getMonth(),i);
            const bookedAppointments = await datastore.listAppointmentAbstract(req.body.clinciId, time.getTime() );
            const appointement = getClinicDaySchedule(date, bookedAppointments,
                                    clinic.appointmentTime, day.from,day.to);
            AppointmentsScheduleINWeek.push(appointement);
        } 
    }
    res.status(StatusCodes.OK).json({ data: AppointmentsScheduleINWeek})
}
const getClinicDaySchedule = (time:Date,bookedAppointments: Appointment[],
                                appointmentTime:number,from: number,to: number)=>{
    const allDayApp = [];
    let index = 0;
    let period = new Date(time.getFullYear(),time.getMonth(),time.getDay(),from).getTime();
    for(let i =0; i<(to - from)/appointmentTime;i++){
        if(index>bookedAppointments.length){
            if(bookedAppointments[index].date === period){
                allDayApp.push({id: i, number:i, date: period, isReserved: true })
                index++;
            }else{
                allDayApp.push({id: i, number:i, date: period, isReserved: false })
            }
        }else{
            allDayApp.push({id: i, number:i, date: period, isReserved: false })
        }
        period += appointmentTime * 60*1000;
    }
    return allDayApp;
}