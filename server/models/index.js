// ./server/models/index.js
const mongoose = require('mongoose');
require('dotenv').config();



// Establish a connection to the database
mongoose.connect(process.env.MONGODB_URL);

const db = {};

// Mongoose connection event listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB.');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});


