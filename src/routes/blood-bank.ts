import { Router } from'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import checkUserType from '../middleware/checkUserType';
import { createBloodRequestSchema, deleteBloodRequestSchema, 
    getBloodRequestSchema, updateBloodRequestSchema } from '../schema/blood-bank';
import { createBloodRequest, deleteBloodRequest, getBloodRequest, 
    listUserBloodRequest, updateBloodRequest } from '../controllers/blood-bank';


const appointmentRouter = Router();

appointmentRouter.route('/')
            .get([requireUser,checkUserType([1])],listUserBloodRequest )
            .post([requireUser, checkUserType([1]),validateRequest(createBloodRequestSchema)],createBloodRequest)

appointmentRouter.route('/:requestId')
            .get([checkUserType([1]),validateRequest(getBloodRequestSchema)], getBloodRequest )
            .put([requireUser, checkUserType([1]), validateRequest(updateBloodRequestSchema)],updateBloodRequest)
            .delete([requireUser, checkUserType([1]), validateRequest(deleteBloodRequestSchema)], deleteBloodRequest)
export default  appointmentRouter;