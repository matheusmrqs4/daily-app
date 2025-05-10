import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('MongoDB Memory Server connected');
  } else {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
};

export default connectDB;
