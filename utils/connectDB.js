const mongoose = require("mongoose");

let connectionPromise;

function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!process.env.MONGO_URI) {
    return Promise.reject(
      new Error("MONGO_URI is missing. Add your MongoDB Atlas connection string in Vercel Environment Variables.")
    );
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
  }

  return connectionPromise;
}

module.exports = connectDB;
