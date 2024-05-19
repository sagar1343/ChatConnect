import express from 'express'
import { getGroup, createGroup, addParticipants, removeParticipants } from '../controllers/groupControllers.js'

const groupRouter = express.Router();

groupRouter.get('/', getGroup)
groupRouter.post('/', createGroup)
groupRouter.patch('/add', addParticipants)
groupRouter.patch('/remove', removeParticipants)

export default groupRouter;