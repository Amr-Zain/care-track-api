/* 
import AppointmentStore from "./appointment";
import DiagnosisStore from "./diagnosis";
import DoctorNurseRecepStore from "./doctorNurseRecep";
import SessionStore from "./session";
import UserStore from "./user";
import { Mixin } from 'ts-mixer';
*/
import connect from "../connect";
import { Connection } from "mysql2/promise";
import { User, Diagnosis,DoctorAppointment, Appointment,PatientAppointment,Medicine,Session, Clinic, Receptionsit, ClinicSchedule  } from "../../schema";
import { DoctorSchedule, DoctorData, NurseData, NurseFullData, DoctorFullData, Rating  } from "../../schema/doctor-nurse";

import AppointmentDAO from "../DAO/appointmentDAO";
import DiagnosisDAO from "../DAO/diagnosisDAO";
import DoctorNurseDAO from "../DAO/doctorNurseDAO";
import ReceptionsitDAO from "../DAO/receptionistDAO";
import UserDAO from "../DAO/userDAO";
import SessionDAO from "../DAO/sessionDAO";
import ClinicDAO from "../DAO/clinicDAO";

class Datastore implements UserDAO, AppointmentDAO, DiagnosisDAO,ClinicDAO,
        DoctorNurseDAO,ReceptionsitDAO,SessionDAO{
    private db :Connection;
    constructor(){
        const connectDB = async()=>{
            this.db = await connect();
        }
        connectDB();
    }    
    async createUser(user: User): Promise<void>{
        await this.db.query(`INSERT INTO user 
        (id, userType, firstName, lastName, email, password, phone, city, gender, birthday, createdAt) 
        VALUES('${user.id}',${user.userType},'${user.firstName}',
        '${user.lastName}','${user.email}','${user.password}','${user.phone}',
        '${user.city}',${user.gender},'${user.birthday}', '${user.createdAt}');`);
    }
    async getUserByPhone(phone: string| number): Promise<User| null>{
        const [ rows ] = await this.db.execute(`SELECT * FROM user WHERE phone = ?`,[phone]);
        
        return rows[0]; 
    }
    async getUserById(userId: string):Promise< User | null >{
        const [ rows ] = await this.db.execute(`SELECT * FROM user WHERE id = ?`,[userId]);
        return rows[0];
    }
    async getUserByEmail(email: string):Promise< User | null >{
        const [ rows ] = await this.db.execute(`SELECT * FROM user WHERE email = ?`,[email]);
        return rows[0];
    } 
    async updateUser(user: User):Promise<void>{
        await this.db.query(`UPDATE user 
        SET firstName = '${user.firstName}', lastName = '${user.lastName}', 
            email = '${user.email}', phone = '${user.phone}', city = '${user.city}',
            birthday = '${user.birthday}';
        WHERE id = '${user.id}'`);
    }
    async updateUserImage(url: string, userId: string) : Promise<void>{
        await this.db.query(`UPDATE user set image = ? WHERE id = ?;`,[url,userId]);
    }
    async resetPassword(userId: string, password: string) : Promise<void>{
        await this.db.query(`UPDATE user set password = ? WHERE id = ?;`,[password,userId]);
        return;
    }

    async deleteUser(userId: string):Promise<void>{
        throw new Error('not implemented');
    }
    async rateDoctorNurse (ratedId: string, patientId: string,value: number,comment: string):Promise<void>{
        await this.db.query(`INSERT INTO rating 
        (patientId, ratedId, rating, comment) 
        VALUES('${patientId}',${ratedId},'${value}','${comment}');`);
    }
    async listRating (id: string):Promise<Rating>{
        const [ rows ] = await this.db.execute(`SELECT *,user.firstName, user.lastName, user.image FORM rating
                                                INNER JOIN user
                                                ON rating.id = ? AND user.id = rating.patientId`,[id])
        return <Rating>rows[0];
    }
    async createAppointment (appointment: Appointment) : Promise<void>{
        await this.db.query(`INSERT INTO appointment 
        (patientId, clinicId, date, bookedAt) 
        VALUES('${appointment.patientId}',${appointment.clinicId},'${appointment.date}','${appointment.bookedAt}');`);
    }
    async createAppointmentWithNurse (appointment: Appointment) : Promise<void>{
        await this.db.query(`INSERT INTO appointment 
        (patientId, nurseId, date, bookedAt) 
        VALUES('${appointment.patientId}',${appointment.nurseId},'${appointment.date}','${appointment.bookedAt}');`);
    }
    async getAppointmentById (appointmentId: string): Promise<Appointment>{
        const [ rows ] = await this.db.execute('SELECT * FORM appointment WHERE id = ?',[appointmentId])
        return <Appointment>rows[0];
    }
    async listPatientAppointment (patientId: string): Promise<PatientAppointment[]>{
        const curr = new Date();
        const today = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate()).getTime();
        const [ appointments ] = await this.db
                                .execute(`
                                            
            SELECT APP4.*,r.rating FROM (
                SELECT app3.*, spe.name AS specialization FROM 
                (
                    SELECT appDoc.*, DN.fees, DN.specializationId FROM 
                    (
                        SELECT apps.*, u.firstName as doctorFname,
                            lastName as doctorLname, u.image as doctorImg
                            FROM
                            (
                                SELECT app.*,c.location, c.doctorId
                                FROM appointment AS app
                                INNER JOIN clinic as c
                                ON app.clinicId = c.id AND app.patientId = '?' AND app.date >= ?
                            ) AS apps
                        INNER JOIN user as u
                        ) AS appDoc
                        INNER JOIN doctor_Nurse AS DN
                        ON DN.userId = appDoc.doctorId
                ) AS app3
                INNER JOIN specialization AS spe
                ON spe.id = app3.specializationId
            ) AS app4
            LEFT JOIN 
                (
                    select ratedId as doctorId, avg(rating) as rating
                    from rating 
                    group by ratedId
                ) as r
            ON r.doctorId = app4.doctorId;

            `,[patientId,today])
        return <PatientAppointment[]>appointments;
    }
    async listAppointmentAbstract(clinicId: string, date: number) : Promise<Appointment[]>{
        const curr = new Date(date);
        const tomorrow = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate()+1).getTime();
        const [ appointments ] = await this.db
                                .execute(`
                                    SELECT app.*,c.location, c.doctorId
                                    FROM appointment AS app
                                    WHERE app.clinicId = '?' AND app.date between ? AND ?
                                    ORDER BY date;`,[clinicId, date, tomorrow])
        return <Appointment[]>appointments;
    }
    async getAppointment(clinicId: string, date: number, patientId: string) : Promise<Appointment[]>{
        const curr = new Date(date);
        const tomorrow = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate()+1).getTime();
        const [ appointments ] = await this.db
                                .execute(`
                                    SELECT app.*,c.location, c.doctorId
                                    FROM appointment AS app
                                    WHERE app.clinicId = '?' AND app.date between ? AND ? AND app.patientId =?
                                    ORDER BY date;`,[clinicId, date, tomorrow, patientId])
        return <Appointment[]>appointments;
    }
    async listDoctorAppointment (clinicId: string, date: number): Promise<DoctorAppointment[]>{
        const curr = new Date(date);
        const tomorrow = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate()+1).getTime();
        const [ appointments ] = await this.db
                                .execute(`
                                SELECT apps.*, u.firstName as patientFname, u.email as patientEmail
                                                lastName as patientLname, u.image as patientImg, u.birthday as patientBirthday
                                                FROM
                                                (
                                                    SELECT app.*,c.location, c.doctorId
                                                    FROM appointment AS app
                                                    INNER JOIN clinic as c
                                                    ON app.clinicId = c.id AND app.clinicId = '?' AND app.date between ? AND ?
                                                ) AS apps
                                            INNER JOIN user as u;`,[clinicId, date, tomorrow])
        return <DoctorAppointment[]>appointments;
    }
    async deleteDoctorAppointment (patientId: string, clinciId: string, date: number): Promise<void>{
        await this.db.execute('DELETE FORM appointment WHERE patientId = ? AND clinicId = ? AND date = ?',[patientId,clinciId,date])
    }
    async  updateAppointmentDate (patientId: string, clinciId: string, date: number, newDate: number) : Promise<void>{
        await this.db.execute(`UPDATE appointment 
        SET date = ? 
        WHERE patientId = ? AND clinicId = ? AND date = ?`,[newDate, patientId,clinciId,date])
    }
    async createDiagnosis({id, patientId, doctorId,date, clinicId, description, medicines}: Diagnosis): Promise<void>{
        await this.db.query(`INSERT INTO diagnosis(id, patientId, doctorId, clinicId, date, description)
        values('${id}','${patientId}','${doctorId}','${clinicId}','${date}','${description}')`);
        /* const [resData] = await this.db.execute(`INSERT INTO medicine (,,) 
                          VALUES(?,?,?);`, params); */
        await this.db.query('INSERT INTO medicine (id, dosage, duration, description, diagnosisId ) VALUES ?',
        [medicines.map(med => [med.id,med.dose, med.duration, med.description, med.diagnosisId])]);
    }
    async getDiagnosisById(diagnosisId: string): Promise<Diagnosis>{
        const [ rows ] = await this.db.execute(`SELECT * FROM diagnosis WHERE id = '?'`,[diagnosisId])
        const medicines = await this.listDiagnosisMedicines(diagnosisId);
        const diagnosis = rows[0];
        diagnosis.medicines = medicines;
        return <Diagnosis> diagnosis;
    }
    async listPatientDiagnosis(specializations: string | string[], date: number, byDocotr: boolean, doctorId: string): Promise<Diagnosis[]>{
        if(!byDocotr){
            const [rows] = await this.db.execute(`
            SELECT daiag.* FROM 
                (
                    SELECT d.*, u.firstName as doctorFName, u.lastName as doctorLName,
                    u.image as doctorImage FROM diagnosis AS d
                    INNER JOIN user AS u
                    ON u.id = d.doctorId AND date > ?
                ) AS daiag
            INNER JOIN doctor_Nurse
            ON specializationId IN (?);`,[date,specializations]);
            return <Diagnosis[]>rows;
        }else{
            const [rows] = await this.db.execute(`
            SELECT daiag.* FROM 
                (
                    SELECT d.*, u.firstName as doctorFName, u.lastName as doctorLName,
                    u.image as doctorImage FROM diagnosis AS d
                    INNER JOIN user AS u
                    ON u.id = d.doctorId AND date > ? AND u.id = ?
                ) AS daiag
            INNER JOIN doctor_Nurse
            ON specializationId IN (?);`
            ,[date,doctorId,specializations]);
            return <Diagnosis[]>rows;
        }
    }
    async getMedicine(medicineId: string): Promise<Medicine>{
        const [ medicine ] = await this.db.execute(`SELECT dia.doctorId, m.*  FROM medicine AS m
        INNER JOIN diagnosis AS dia
        ON m.id = '?' AND m.diagnosisId = dia.id;`,[medicineId])
        return <Medicine>medicine[0]
    }
    async updateMedicine({id, name, dose, duration, description }: Medicine): Promise<void>{
        await this.db.execute(`UPDATE medicine 
                        SET name = ?, dosage = ?, duration =?, description = ? 
                        WHERE id = ?`,[name, dose, duration, description, id])
    }
    async deleteMedicine(medicineId: string): Promise<void>{
        await this.db.execute(`DELETE FROM medicine WHERE id = ?`,[ medicineId ])
    }
    async listDiagnosisMedicines(diagnosisId: string): Promise<Medicine[]>{
        const [ medicines ] = await this.db.execute(`SELECT * FROM medicine WHETE diagnosisId = '?'`,[diagnosisId])
        return <Medicine[]>medicines;
    }
    async createSession(session: Session): Promise<void>{
        await this.db.query(`INSERT INTO session 
        (id, userId, userAgent, valid, createdAt, lastAccess,userType) 
        VALUES('${session.id}', '${session.userId}', '${session.userAgent}',
        ${session.valid}, '${session.createdAt}','${session.lastAccess}',${session.userType} );`);
    }
    async getSessionById(sessionId: string): Promise<Session>{
        const [rows] = await this.db
        .execute('SELECT * FROM session WHERE id = ?', [sessionId]);
        return <Session>rows[0];
    }
    async listUserValidsession(userId: string): Promise<Session[]>{
        const [rows] = await this.db.execute(`SELECT * FROM session 
                                WHERE userId = ? and valid =1;`,[userId]);
        return <Session[]>rows;
    }
    async invalidateSession(sessionId: string): Promise<void>{
        await this.db.execute(`UPDATE session
        SET valid = false 
        WHERE id = ?;`,[sessionId]);
    }
    async createDoctorNurseData(data: DoctorData | NurseData): Promise<void>{
        const nurse = data as NurseData;
        const doctor = data as DoctorData;
        if(doctor.specialization){
            await this.db.query(`INSERT INTO doctor_Nurse 
            (userId, specializationId, fees, description, appointmentTime) 
            VALUES('${data.userId}', '${doctor.specialization}',
            '${data.fees}','${data.description}',${doctor.appointmentTime} );`);
        }else{
            await this.db.query(`INSERT INTO doctor_Nurse 
            (userId, fees, description, location) 
            VALUES('${nurse.userId}','${nurse.fees}','${nurse.description}','${nurse.location}');`);
        }
    }

    async getDotor ( id:string) :Promise<DoctorFullData>{
        const [rows] = 
        await this.db.execute(`SELECT WC.* , SP.name as specialization
                                FROM(SELECT FullData.*, c.name 
                                    FROM(
                                        SELECT u.id, u.firstName, u.lastName, u.email, u.city as cityId, u.image,u.userType,
                                        d.fees, d.description, d.appointmentTime, d.specializationId as spId
                                        FROM user as u
                                        INNER JOIN doctor_Nurse d
                                        ON u.id = ? AND u.id = d.userId 
                                    ) as FullData
                                    INNER JOIN city c 
                                    ON FullData.cityId = c.id) AS WC
                                INNER JOIN specialization SP 
                                ON WC.spId = SP.id;`,[id]);
        return rows[0];
    }
    async getNurse ( id:string) :Promise<NurseFullData>{
        const [rows] = 
        await this.db.execute(`(SELECT FullData.*, c.name 
                                    FROM(
                                        SELECT u.id, u.firstName, u.lastName, u.email, u.city as cityId,
                                        u.image, u.userType, d.fees, d.description
                                        FROM user as u
                                        INNER JOIN doctor_Nurse d
                                        ON u.id = ? AND u.id = d.userId 
                                    ) as FullData
                                    INNER JOIN city c 
                                    ON FullData.cityId = c.id);`,[id]);
        return rows[0];
    }
    async updateDoctorNurseData(data: DoctorData | NurseData): Promise<void>{
        const nurse = data as NurseData;
        const doctor = data as DoctorData;
        console.log('arived at the update fun')
        if(doctor.specialization){
            await this.db
                .execute(`UPDATE doctor_nurse 
                        SET  specializationId =?, fees =?, description=?, appointmentTime=?
                        WHERE userId = ?;`,[ doctor.specialization,doctor.fees ,
                            doctor.description, doctor.appointmentTime, doctor.userId ]);
        }else{
            await this.db
                .execute(`UPDATE doctor_nurse 
                        SET   fees =?, description=?, location =?
                        WHERE userId = ?;`,[ nurse.fees ,nurse.description, 
                            nurse.location, nurse.userId ]);
        }
        
    }
    async getClinicSchedule(clinicId :string): Promise<ClinicSchedule[]>{
        const [ rows ] = await this.db.
            execute(`SELECT * FROM clinic_schedule 
                    WHERE clinicId = '?'
                    order by day desc`,[clinicId])
        return <ClinicSchedule[]>rows;
    }
    async postClinicSchedule(clinicSchedule: ClinicSchedule[],clinicId: string): Promise<void>{
        await this.db.query(`INSERT INTO clinic_schedule(day, clinicId, \`from\`, \`to\`) VALUES(?, ?, ?,?) 
            ON DUPLICATE KEY UPDATE \`from\`=?, \`to\`=?`,
        [clinicSchedule.map(s => [s.day,clinicId, s.from, s.to,s.from,s.to])]);
    }
    async deleteDayFromSchedule(clinicId :string, day :number): Promise<void>{
        await this.db.
        execute(`DELETE FROM clinic_schedule WHERE clinicId = ? AND day = ?`,[clinicId,day])
    }
    async updateDayFromSchedule(clinicSchedule: ClinicSchedule): Promise<void>{
        await this.db
                .execute(`UPDATE clinic_schedule 
                        SET  from =?, to =?
                        WHERE clinicId = ?;`
                        ,[ clinicSchedule.from,clinicSchedule.to, clinicSchedule.clinicId ]);
    }
    async postDayToSchedule(clinicSchedule: ClinicSchedule): Promise<void>{
        await this.db.query(`INSERT INTO clinic_schedule(day, clinicId, \`from\`, \`to\`) VALUES(?, ?, ?,?);`,
        [clinicSchedule.day, clinicSchedule.clinicId, clinicSchedule.from, clinicSchedule.to]);
    }
    async getReceptionsit( receptionsitId: string): Promise<Receptionsit>{
        const [rows] = await this
                .db.execute(`SELECT u.id, r.doctorId, u.userType, u.firstName, u.lastName,
                                u.city, u.createdAt, u.gender,u.email, u.phone, u.birthday FROM receptionsit as r 
                            INNER JOIN user as u
                            ON r.id = u.id;`
                            ,[ receptionsitId]);
        return <Receptionsit> rows[0];
    }
    async isReceptionsitOfDoctor( doctorId: string, email: string ): Promise<Receptionsit| null>{
        const [rows] = await this
                .db.execute(`SELECT clinic_recep.*, clinic.doctorId as doctorId 
                            FROM (
                                    SELECT u.*,   recep.clinicId as clinicId 
                                    FROM user as u
                                    INNER JOIN receptionsit recep
                                    ON u.userType = 4 AND u.email = ? AND recep.receptionsitId = u.id 
                                ) as clinic_recep
                            INNER JOIN clinic 
                            ON clinic.doctorId = ?;`
                            ,[email, doctorId]);
        return <Receptionsit> rows[0];
    }
    async listReceptionsits(doctorId :string): Promise<Receptionsit[]>{
        const [ rows ] = await this.db
                        .execute(`SELECT u.id, r.doctorId, u.userType, u.firstName, u.lastName,
                                        u.city, u.createdAt, u.gender,u.email, u.phone, u.birthday FROM receptionsit as r 
                                    INNER JOIN user as u
                                    ON r.doctorId = ? AND u.id = r.receptionsitId;`
                                ,[doctorId]);
        /* 
            SELECT clinicReceps.*, user.id as doctorId
                                FROM (
                                    SELECT clinic_recep.*, clinic.doctorId as doctorId 
                                        FROM (
                                                SELECT u.id, u.userType, u.firstName, u.lastName, 
                                                    u.email, u.phone, u.createdAt, recep.clinicId as clinicId 
                                                FROM user as u
                                                INNER JOIN receptionsit recep
                                                ON recep.receptionsitId = u.id AND clinicId = ?
                                            ) as clinic_recep
                                            INNER JOIN clinic 
                                    ON clinic_recep.clinicId = clinic.id) AS clinicReceps
                                INNER JOIN user
                                ON user.id = clinicReceps.doctorId AND user.id = ?;        
        */
        return <Receptionsit[]>rows;
    }
    async createReceptionsit(clinicId: string, receptionsitId: string, doctorId: string): Promise<void>{
        await this.db.query(`INSERT INTO receptionsit 
            (receptionsitId, clinicId, doctorId) 
            VALUES('${receptionsitId}', '${clinicId}', '${doctorId}');`);
    }
    async deleteReceptionsit(doctorId: string, receptionsitId: string): Promise<void>{
        await this.db.execute(`DELETE FROM receptionsit
                            WHERE receptionsitId = ? AND doctorId = ?;`
                            ,[receptionsitId,doctorId]);
        //I may delete the user if it also
    }
    async listDoctorClinics (doctorId: string) : Promise<Clinic[]>{
        const [ rows ] = 
        await this.db.execute(`SELECT * 
                                FROM clinic
                                WHERE clinic.doctorId =?`,[doctorId]);
        return <Clinic[]>rows;
    }
    async getClinic(clinicId: string) : Promise<Clinic>{
        const [rows] = 
        await this.db.execute(`SELECT clinic.*, appointmentTime 
                                FROM clinic 
                                INNER JOIN doctor_Nurse
                                on clinic.id = ? AND doctor_Nurse.userId = clinic.doctorId  ;`,[clinicId]);
        return <Clinic>rows[0];
    }
    async addClinic (clinic: Clinic) :Promise<void>{
        await this.db.query(`INSERT INTO clinic 
            (id, doctorId, clinicName, city, location, phone) 
            VALUES('${clinic.id}','${clinic.doctorId}','${clinic.clinicName}',
            '${clinic.city}','${clinic.location}','${clinic.phone}');`);
    }
    async deleteClinic (clinicId: string) : Promise<void>{
        await this.db.execute(`DELETE FROM clinic 
                                WHERE id = ?`,[clinicId]);
    }
    async updateClinic (clinic :Clinic) : Promise<void>{
        console.log(clinic)
        await this.db.execute(`UPDATE clinic 
                                SET clinicName = ?, phone = ?
                                WHERE id = ?;`,[ clinic.clinicName,clinic.phone ,clinic.id ]);
        
    }
}
export default new Datastore();