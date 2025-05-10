// src/index.ts
import dotenv from 'dotenv';
import connectDB from './config/mongo';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
