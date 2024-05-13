import express from 'express';
import { getAllChats, getChat, createChat, deleteChat } from '../controllers/chatControllers.js'

const chatRouter = express.Router();

chatRouter.get('/', getAllChats)
chatRouter.post('/', createChat)
chatRouter.get('/:id', getChat)
chatRouter.delete('/:id', deleteChat)

export default chatRouter;