const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
