let mongoose;
const connectingURL = process.env.MONGO_CONNECTION_STRING; //from .env
const connection: { isConnected?: number } = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  if (typeof window === "undefined") {
    mongoose = await import("mongoose");
    const db = await mongoose.connect(connectingURL!);
    connection.isConnected = db.connections[0].readyState;
  } else {
    console.warn(
      "Attempted to connect to DB on client side. This should not happen."
    );
  }
}

export const config = {
  unstable_allowDynamic: [
    "/node_modules/@mongodb-js",
    "/node_modules/@mongoose/dist/browser.umd.js",
  ],
};

export default connectDB;
