import mongoose from "mongoose";

export function mongooseConnect() {
  // Check if the connection state is 'connected' (value: 1)
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
    // if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
    return mongoose.connect(uri);
  }
}
