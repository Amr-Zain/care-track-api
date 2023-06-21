//import validateRequest from "../middleware/validateRequest";
//import { createUserSchema, getUserByIdSchema,  } from "../schema/user";
//import { createUser, getUserById } from '../controllers/user';
import { Router } from'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import {  createClinicSchema, createScheduleSchema, deleteDayToSchedule, getAvailableAppointmentsSchema, getScheduleSchema, updateDayToSchedule } from '../schema/clinic';
import { createClinic, deleteClinic, updateClinic,listClinics, 
    postClinicSchedule, getClinicSchedule,updateDay,addDay,deleteDay
} from '../controllers/clinic';
import checkUserType from '../middleware/checkUserType';

const clinicRouter = Router();

//doctorRouter.route('/').post(/* [validateRequest(createUserSchema)], */ createUser);
//doctorRouter.route('/:id').get(/* validateRequest(getUserByIdSchema), */ getUserById);

clinicRouter.route('/')
            .get([requireUser, checkUserType([2])], listClinics)
            .post([requireUser,validateRequest(createClinicSchema),checkUserType([2])],createClinic);

clinicRouter.route('/:id')
            .put([requireUser,validateRequest(createClinicSchema),checkUserType([2])],updateClinic)
            .delete([requireUser,validateRequest(createClinicSchema),checkUserType([2])],deleteClinic);

clinicRouter.route('/:clinicId/schedule')
            .post([requireUser,checkUserType([2]),validateRequest(createScheduleSchema)],postClinicSchedule)
            .get(validateRequest(getScheduleSchema),getClinicSchedule);

clinicRouter.route('/:clinicId/schedule/:day')
            .get()
            .delete([requireUser, checkUserType([2]),validateRequest(deleteDayToSchedule)],deleteDay)
            .put([requireUser, checkUserType([2]),validateRequest(updateDayToSchedule)],updateDay)
            .post([requireUser, checkUserType([2]),validateRequest(updateDayToSchedule)],addDay);

clinicRouter.route('/:clinicId/available_date')
            .get([validateRequest(getAvailableAppointmentsSchema)], )
export default  clinicRouter;