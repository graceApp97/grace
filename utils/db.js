const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './../config.env' });

const connectDB = db => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
