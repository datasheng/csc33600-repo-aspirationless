import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);

app.listen(8800, () => {
    console.log('Backend server is running!');
});