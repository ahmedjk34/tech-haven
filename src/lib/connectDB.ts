"use server";
import mongoose from "mongoose";

const connectingURL = process.env.MONGO_CONNECTION_STRING; //from .env
console.log(connectingURL);

const connection: { isConnected?: number } = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(connectingURL!);
  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
