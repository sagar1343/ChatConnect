import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
} from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', removeUser);

export default userRouter;
