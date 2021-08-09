import validator from '../middlewares/validatorMiddleware';
import auth from '../middlewares/authMiddleware';
import { Router } from 'express';
import groupController from '../controllers/groupController';
import uploader from '../middlewares/uploaderMiddleware';

const groupRouter = Router();

/**
 * Аll routes start with '/group'
 **/
groupRouter.post(
    '/',
    auth,
    uploader,
    validator('group-create'),
    groupController.create,
);
groupRouter.get('/', groupController.getAllGroups);
groupRouter.put(
    '/:id',
    auth,
    uploader,
    validator('group-create'),
    groupController.update,
);
groupRouter.get('/own', auth, groupController.getOwnGroups);
groupRouter.delete('/:id', auth, groupController.deleteGroup);
groupRouter.get('/:id', groupController.getSingleGroup);

export default groupRouter;
