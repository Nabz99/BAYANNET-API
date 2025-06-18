const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cors = require('cors');
const router = require('./src/routes');
const apiKeyMiddleware = require('./middleware/apiKey');
require('dotenv').config();
const seeder = require("./src/classes/Seeder");
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Initialize seeders
new seeder().admin();
new seeder().commune();
new seeder().wilaya();
new seeder().region();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // Adjust this in production
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(apiKeyMiddleware);

// Routes
app.use('/api', router);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a conversation
  socket.on('joinConversation', ({ conversationId }) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  // Leave a conversation
  socket.on('leaveConversation', ({ conversationId }) => {
    socket.leave(conversationId);
    console.log(`User left conversation: ${conversationId}`);
  });

  // Send and receive messages
  socket.on('sendMessage', async (messageData) => {
    try {
      // Save message to database
      const Message = require('./src/classes/MessageClass');
      const newMessage = await Message.create(messageData);

      // Emit to all participants in the conversation
      const conversationId = [messageData.sender, messageData.receiver].sort().join('_');
      io.to(conversationId).emit('receiveMessage', newMessage);

      // Notify the receiver if they're not in the conversation
      io.emit(`newMessageNotification:${messageData.receiver}`, {
        sender: messageData.sender,
        message: messageData.content
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Mark messages as read
  socket.on('markMessagesAsRead', async ({ senderId, receiverId }) => {
    try {
      const Message = require('./src/classes/MessageClass');
      await Message.markMessagesAsRead(senderId, receiverId);
      
      const conversationId = [senderId, receiverId].sort().join('_');
      io.to(conversationId).emit('messagesRead', { senderId, receiverId });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });