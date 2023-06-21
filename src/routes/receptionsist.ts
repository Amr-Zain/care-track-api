//import { createUser, getUserById } from '../controllers/user';
import { Router} from'express';
// I think we will not need this 
const patientRouter = Router();

patientRouter.route('/').post().get();
patientRouter.route('/:id').get().delete();


export default  patientRouter;