import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());

// Zod Schema for Profile Validation
const ProfileSchema = z.object({
    userId: z.string(),
    email: z.string().email(),
    fullName: z.string().min(2),
    bio: z.string().optional(),
    skills: z.string().optional(),
    role: z.enum(['candidate', 'recruiter']).default('candidate'),
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'profile-service' });
});

// Create or Update Profile
app.post('/api/profiles', async (req, res) => {
    try {
        const validatedData = ProfileSchema.parse(req.body);
        const { userId, ...data } = validatedData;

        // Check if profile exists
        const existingProfile = await prisma.profile.findUnique({
            where: { userId },
        });

        let profile;
        if (existingProfile) {
            profile = await prisma.profile.update({
                where: { userId },
                data,
            });
        } else {
            profile = await prisma.profile.create({
                data: { userId, ...data },
            });
        }

        res.json(profile);
    } catch (error) {
        console.error('Error in /api/profiles:', error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to save profile' });
        }
    }
});

// Get Profile by User ID
app.get('/api/profiles/:userId', async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: req.params.userId },
        });

        if (!profile) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Profile Service running on port ${PORT}`);
});
