//import validateRequest from "../middleware/validateRequest";
//import { createUserSchema, getUserByIdSchema,  } from "../schema/user";
//import { createUser, getUserById } from '../controllers/user';
import { Router } from'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import { createAppointentSchema, getDoctorAppointmentsSchema, getDoctorNurseSchema, postDoctorDataSchema, updateDoctorDataSchema } from '../schema/doctor-nurse';
import checkUserType from '../middleware/checkUserType';
import { createDoctorData, getDoctor, updateDoctorData } from '../controllers/doctor';
import { listAppointments } from '../controllers/appointment';
import { createReceptionsit,/*  addExistingReceptionsist, */
        deleteReceptionsit, getReceptionsit, listReceptionsits,} from '../controllers/receptionsit';
import { /* addExistingReception, */ createReceptionsitSchema, deleteReceptionsitSchema, 
        getReceptionsitSchema } from '../schema/reception';

const doctorRouter = Router();

//doctorRouter.route('/').post(/* [validateRequest(createUserSchema)], */ createUser);
//doctorRouter.route('/:id').get(/* validateRequest(getUserByIdSchema), */ getUserById);

doctorRouter.route('/')
        .post([requireUser, validateRequest(postDoctorDataSchema),checkUserType([2])],createDoctorData)
        .put([requireUser, validateRequest(updateDoctorDataSchema),checkUserType([2])], updateDoctorData)
        .get(requireUser, checkUserType([2]), getDoctor);

doctorRouter.route('/:id')
        .get(validateRequest(getDoctorNurseSchema), getDoctor);
doctorRouter.route('/:id/appointment')
        .get([requireUser, checkUserType([2]), validateRequest(getDoctorAppointmentsSchema)], listAppointments)
        .post([requireUser, checkUserType([2,4]), validateRequest(createAppointentSchema)])


doctorRouter.route('/reception')
        .get([requireUser, checkUserType([2])], listReceptionsits)
        .post([requireUser, checkUserType([2]),
                validateRequest(createReceptionsitSchema)], createReceptionsit);
/* doctorRouter.route('/:id/add_existing_reception').post([requireUser, checkUserType([2]), 
        validateRequest(addExistingReception)], addExistingReceptionsist); */

doctorRouter.route('/reception/:receptionsitId')
        .get([requireUser, checkUserType([2]),
                validateRequest(getReceptionsitSchema)],getReceptionsit)
        .delete([requireUser, checkUserType([2]), 
                validateRequest(deleteReceptionsitSchema)],deleteReceptionsit);
export default  doctorRouter;