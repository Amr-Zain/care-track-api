import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user";
import { createUser, postUserImage, getAuthedUser } from '../controllers/user';
import { Router} from'express';
import requireUser from "../middleware/requireUser";

const patientRouter = Router();

patientRouter.route('/').post([validateRequest(createUserSchema)], createUser)
                        .get([requireUser], getAuthedUser);
patientRouter.route('/photo').post([validateRequest,],postUserImage);



export default  patientRouter;