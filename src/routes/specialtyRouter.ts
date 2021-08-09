import { Router } from 'express';
import specialtyController from '../controllers/specialtyController';

const specialtyRouter = Router();

/**
 * Аll routes start with '/specialty'
 **/

// Get all specialties
specialtyRouter.get('/', specialtyController.getSpecialties);

export default specialtyRouter;
