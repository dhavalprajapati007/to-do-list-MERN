import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import connectDB from './config/db.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


// Start the server
const startServer = async () => {
    try {
        await connectDB(); // Attempt to connect to the database
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error); // Log any error that occurs
    }
};

// Call the function to start the server
startServer();

