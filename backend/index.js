import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js'; // Import the product routes
import searchRoutes from './routes/search.js';
import searchHistoryRoutes from './routes/search_history.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);  // Add this line
app.use('/api/search', searchRoutes);
app.use('/api/search_history', searchHistoryRoutes);



app.listen(8800, () => {
    console.log('Backend server is running!');
});


