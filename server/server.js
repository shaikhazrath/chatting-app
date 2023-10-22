import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/messageModel.js';
config({ path: './.env' });
import Auth from './routers/authRouter.js';
import Group from './routers/groupsRouter.js';
import Messages from './routers/messagesRouter.js'
import { messageauthmiddleware } from './middleware/messageauthMiddleware.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);


const corsOptions = {
  origin: 'http://192.168.55.107:8081',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


cloudinary.config({
  cloud_name: 'dzhbqwghe',
  api_key: '978513459175788',
  api_secret: 'cjNR0oqXGZjdx0C-rQmd-0mozaU',
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/', Auth);
app.use('/', Group);
app.use('/', Messages);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId); 
  });

  socket.on('chat message', async (message) => {
    try {
      const token = message.authorization;
  
      const user = await messageauthmiddleware(token);
  
      if (!user) {
        console.error('Unauthorized user');
        return;
      }
  
      const newMessage = new Message({
        text: message.text,
        sender: user,
        group: message.group,
      });
  
 await newMessage.save();
  
      // Emit the message to all clients in the group
      io.to(message.group).emit('chat message', message);
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  });;
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        'Server is running on port ' +
          colors.cyan(`http://localhost:${process.env.PORT}`)
      );
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
