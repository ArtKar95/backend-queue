import validator from '../middlewares/validatorMiddleware';
import userController from '../controllers/userController';
import { Router } from 'express';
import auth from '../middlewares/authMiddleware';

const userRouter = Router();

/**
 * Аll routes start with '/user'
 **/

// Sign in
userRouter.post('/sign-in', validator('user-sign-in'), userController.signIn);

// Create a new user
userRouter.post('/sign-up', validator('user-create'), userController.create);

// Update token
userRouter.put('/:id/token', userController.updateToken);

// Get user
userRouter.get('/', auth, userController.getUser);

export default userRouter;
