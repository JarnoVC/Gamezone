const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('http'); // Import createServer from http
const { Server } = require('socket.io'); // Import Server from socket.io

dotenv.config();

// create express app
const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;


// middleware

// List of allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://gamezone-mis8.onrender.com',
];

app.use(cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowed origins list
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
}));
app.use(express.json());

// Create HTTP server and bind it with Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

// Function to emit order updates
const emitOrderUpdate = (order) => {
    io.emit('orderUpdated', order);
};

// Export emitOrderUpdate so it can be used in controllers
module.exports.emitOrderUpdate = emitOrderUpdate;


const userRoutes = require('./routes/api/v1/UserRoutes');
const productRoutes = require('./routes/api/v1/ProductRoutes');
const orderRoutes = require('./routes/api/v1/OrderRoutes');
const authRoutes = require('./routes/api/v1/Authroutes');



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/auth', authRoutes);

// connect to database
mongoose.connect(mongodbUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
});

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle the disconnection event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});

// Start the server with the http server, not the express app
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
