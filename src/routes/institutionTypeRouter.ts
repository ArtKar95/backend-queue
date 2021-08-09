import institutionTypeController from '../controllers/institutionTypeController';
import { Router } from 'express';

const institutionTypeRouter = Router();

/**
 * Аll routes start with '/institution-types'
 **/

institutionTypeRouter.get('/', institutionTypeController.getAll);

export default institutionTypeRouter;
