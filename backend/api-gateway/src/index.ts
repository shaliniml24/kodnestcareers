import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-gateway' });
});

// Proxy routes
app.use('/api/profiles', createProxyMiddleware({ target: 'http://localhost:8002', changeOrigin: true }));
app.use('/api/jobs', createProxyMiddleware({ target: 'http://localhost:8003', changeOrigin: true }));
// app.use('/auth', createProxyMiddleware({ target: 'http://localhost:8001', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
