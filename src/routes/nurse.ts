
import { Router} from'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import { getDoctorNurseSchema, postNurseDataSchema } from '../schema/doctor-nurse';
import userTypeCheck from '../middleware/checkUserType';
import { createNurseData, getNurse, updateNurseData } from '../controllers/nurse';

const nurseRouter = Router();

nurseRouter.route('/')
            .post([requireUser, validateRequest(postNurseDataSchema),userTypeCheck([3])], createNurseData)
            .get([requireUser,userTypeCheck([3])], getNurse)
            .put([requireUser, validateRequest(postNurseDataSchema),userTypeCheck([3])], updateNurseData);
nurseRouter.route('/:id').get(validateRequest(getDoctorNurseSchema),getNurse)
export default  nurseRouter;