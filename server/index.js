import express from 'express';
import cors from 'cors';
import queryRouter from './routes/query.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'IP-SAKTI SAHAYAK API', timestamp: new Date().toISOString() });
});

// Primary Query API Endpoint
app.use('/api', queryRouter);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[IP-SAKTI Server] Backend API server listening on http://localhost:${PORT}`);
});
