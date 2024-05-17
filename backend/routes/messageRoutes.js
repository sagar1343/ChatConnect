import express from 'express';
import { getMessage, createMessage } from '../controllers/messageControllers.js';

const messageRouter = express.Router();

messageRouter.get('/', getMessage);
messageRouter.post('/', createMessage);

export default messageRouter;