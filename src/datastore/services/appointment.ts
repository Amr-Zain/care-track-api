import { Appointment, PatientAppointment, DoctorAppointment } from "../../schema";
import AppointmentDAO from "../DAO/appointmentDAO";
import { Connection } from "mysql2";

export default class AppointmentStore /* implements AppointmentDAO  */{
    private db5: Connection;
    constructor(db: Connection) {
        this.db5 = db;
    }
    
}