const dotenv = require('dotenv');
// const express = require('express');
const connectDB = require('./utils/db');

dotenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//  Connect Database
connectDB(db);

// // Init Middleware
// app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to the Grace API' }));

// // Define Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
