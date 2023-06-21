import { Appointment, PatientAppointment, DoctorAppointment } from "./../../schema";

export default interface AppointmentDAO  {
    createAppointment: (diagnosis: Appointment)=>Promise<void>;
    getAppointmentById: (diagnosis: string)=>Promise<Appointment | null>;
    listPatientAppointment:( patientId: string )=>Promise<PatientAppointment[] |null>;
    listDoctorAppointment:( clinicId: string, date: number )=> Promise<DoctorAppointment[] | null>;
    deleteDoctorAppointment: (patientId: string, clinciId: string, date: number) =>Promise<void>;
    updateAppointmentDate: (patientId: string, clinciId: string, date: number, newDate: number) =>Promise<void>;
}