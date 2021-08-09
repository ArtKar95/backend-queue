import validator from '../middlewares/validatorMiddleware';
import auth from '../middlewares/authMiddleware';
import { Router } from 'express';
import institutionController from '../controllers/institutionController';
import uploader from '../middlewares/uploaderMiddleware';

const institutionRouter = Router();

/**
 * Аll routes start with '/institution'
 **/

institutionRouter.get('/', institutionController.getAll);

institutionRouter.get('/own', auth, institutionController.getOwnInstitutions);

institutionRouter.get('/:id', institutionController.getSingle);

institutionRouter.post(
    '/',
    auth,
    uploader,
    validator('institution-create'),
    institutionController.create,
);

institutionRouter.put(
    '/:id',
    auth,
    uploader,
    validator('institution-update'),
    institutionController.update,
);

institutionRouter.delete('/:id', auth, institutionController.deleteInstitution);

export default institutionRouter;
