import { Router } from 'express';

import { createUser } from '../controllers/UserController';
import { newUserValidation } from '../middlewares/validators/UserValidation';
import { validate } from '../middlewares/validators/validate';

const UserRoute = Router();

UserRoute.route('/').post(newUserValidation, validate, createUser);
export default UserRoute;
