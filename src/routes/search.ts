//import validateRequest from "../middleware/validateRequest";
//import {  } from "../schema/user";
//import {  } from '../controllers/user';
import { Router} from'express';
import validateRequest from '../middleware/validateRequest';
import { searchSchema } from '../schema/search';
import { search } from '../controllers/user';

const searchRouter = Router();

searchRouter.route('/:type/:city').get([validateRequest(searchSchema)],search)



export default  searchRouter;