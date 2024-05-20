import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import authRouter from './routes/authRoutes.js';
import groupRouter from './routes/groupRoutes.js';
import socketHandler from './socketHandler.js'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json({ limit: '10mb' }));
app.use('/chatconnect/api/auth', authRouter)
app.use('/chatconnect/api/users', userRouter);
app.use('/chatconnect/api/messages', messageRouter);
app.use('/chatconnect/api/chats', chatRouter);
app.use('/chatconnect/api/group', groupRouter);


socketHandler(io);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connection failed'));

const port = process.env.PORT || 8000;

httpServer.listen(port, () => console.log(`listening to port: ${port}`));
