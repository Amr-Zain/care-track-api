//import validateRequest from "../middleware/validateRequest";
//import {  } from "../schema/user";
//import {  } from '../controllers/user';
import { Router} from'express';

const searchRouter = Router();

searchRouter.route('/:userType/:city').get()



export default  searchRouter;