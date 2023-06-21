import { number, object, string } from "yup";

export default interface Appointment{
    id: string;
    patientId: string;
    clinicId: string;
    nurseId: string;
    bookedAt: number;
    date: number;
}

export interface PatientAppointment extends Appointment{
    doctorName: string;
    doctorImg: string;
    specialization: string;
    doctorRating: number;
    location: string;
    fees: number;
}

export interface DoctorAppointment extends Appointment {
    bookedAt: number; 
    date: number; 
    patientName: string;
    patientImg: string;
    patientAge: number;
    patientEmail: string;
}
export const  AppointmentsSchema = object({
    body: object({
        clinicId: string().required('clinicId is required'),
        date: number().required('date of the appointment is required'),
    })
})

export const  updateAppointmentsSchema = object({
    body: object({
        clinicId: string().required('clinicId is required'),
        newDate: number().required('newDate of the appointment is required'),
        date: number().required('date of the appointment is required'),
    })
})

