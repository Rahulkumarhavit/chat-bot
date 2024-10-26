const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { askGemini } = require('./geminiService');
const { getProductResponse } = require('./productService');
const path = require('path');
const cors = require('cors');
// Load environment variables
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Use the base URL of your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Same here
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});


// Middleware

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for the user query
  socket.on('userQuery', async (query) => {
    try {
      // Get the Gemini response
      const geminiResponse = await askGemini(query);

      // Get product recommendations
      const productResponse = getProductResponse(query);

      // Send the response back to the client
      socket.emit('botResponse', {
        answer: geminiResponse,
        recommendedProducts: productResponse,
      });
    } catch (error) {
      console.error('Error:', error.message);
      socket.emit('botResponse', { error: 'Chatbot error' });
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
