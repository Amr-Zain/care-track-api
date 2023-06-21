//import validateRequest from "../middleware/validateRequest";
//import { createUserSchema, getUserByIdSchema } from "../schema/user";
//import { createUser, getUserById } from '../controllers/user';
import { Router } from'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import checkUserType from '../middleware/checkUserType';
import { listAppointments, postAppointment, deleteAppointment, updateAppointmentDate } from '../controllers/appointment';
import { AppointmentsSchema } from '../schema/appointment';


const appointmentRouter = Router();

appointmentRouter.route('/')
            .get([requireUser, checkUserType([1,2,4])],listAppointments )
            .post([requireUser,checkUserType([1]), validateRequest(AppointmentsSchema)], postAppointment)
            .delete([requireUser, checkUserType([1]),validateRequest(AppointmentsSchema)],deleteAppointment )
            .patch([requireUser, checkUserType([1]),validateRequest(AppointmentsSchema)],updateAppointmentDate );//upate The date


export default  appointmentRouter;