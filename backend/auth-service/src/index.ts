import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
});

// Mock Login Route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // TODO: Implement actual auth
    if (email === 'admin@kodnest.com' && password === 'admin') {
        res.json({ token: 'mock-jwt-token', user: { email, role: 'admin' } });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
