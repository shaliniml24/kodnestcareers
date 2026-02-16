import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

// Zod Schema for Job Validation
const JobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    company: z.string().min(2),
    location: z.string().min(2),
    salaryRange: z.string().optional(),
    type: z.enum(['full-time', 'part-time', 'contract', 'internship']).default('full-time'),
    postedBy: z.string(), // userId of recruiter
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'job-service' });
});

// Create Job
app.post('/api/jobs', async (req, res) => {
    try {
        const validatedData = JobSchema.parse(req.body);
        const job = await prisma.job.create({
            data: validatedData,
        });
        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create job' });
        }
    }
});

// List Jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get Job Details
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await prisma.job.findUnique({
            where: { id: req.params.id },
        });

        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }

        res.json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Job Service running on port ${PORT}`);
});
