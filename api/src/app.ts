import express from 'express';
import userRoutes from './routes/userRoutes';
import dailyRoutes from './routes/dailyRoutes';
import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors({
  origin: '*', 
}));

app.use('/api/users', userRoutes);
app.use('/api/dailies', dailyRoutes);

export default app;
