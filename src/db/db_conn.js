const mongoose = require("mongoose");
require('dotenv').config();
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Error connecting to MongoDB:', error);
});

db.once('open', function() {
  console.log('Success connecting to MongoDB!');
});

module.exports = db;