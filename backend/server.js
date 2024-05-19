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

app.use(morgan('tiny'));
app.use(express.json({ limit: '10mb' }));
app.use('/chatconnect/api/auth', authRouter)
app.use('/chatconnect/api/users', userRouter);
app.use('/chatconnect/api/messages', messageRouter);
app.use('/chatconnect/api/chats', chatRouter);
app.use('/chatconnect/api/group', groupRouter);


socketHandler(io);

mongoose
  .connect('mongodb://localhost:27017/chatconnect')
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connection failed'));

httpServer.listen(8000, () => console.log('listening to port: 8000'));
