import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;