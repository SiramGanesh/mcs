// ============================================
// Database Connection Configuration
// ============================================
// This file handles connecting to MongoDB.
// We use Mongoose - a library that makes it
// easier to work with MongoDB in Node.js.
// ============================================

const mongoose = require('mongoose');

// This function connects to MongoDB
const connectDB = async () => {
  try {
    // mongoose.connect() tries to connect to the database
    // We pass the connection string from our .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and stop the server
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

// Export so we can use it in server.js
module.exports = connectDB;
