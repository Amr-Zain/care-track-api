import{ User } from "../../schema";
//import { DoctorNurseData, DoctorSchedule } from "../../schema/doctor-nurse";
import DoctorNurseDAO from "../DAO/doctorNurseDAO";
import ReceptionsitDAO from "../DAO/receptionistDAO";
import { Connection } from "mysql2";

export default class DoctorNurseRecepStore/*  implements DoctorNurseDAO, ReceptionsitDAO  */{
    private db3 : Connection;
    constructor(db: Connection) {
        this.db3 = db;
    }
   
}