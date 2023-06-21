import { Appointment, PatientAppointment, DoctorAppointment, Diagnosis, Medicine } from "../../schema";
import DiagnosisDAO from "../DAO/diagnosisDAO";
import { Connection } from "mysql2";

export default class DiagnosisStore /* implements DiagnosisDAO */ {
    private db4 : Connection;
    constructor(db: Connection) {
        this.db4 = db;
    }
    
    
}