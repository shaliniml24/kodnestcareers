'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { Briefcase, MapPin, DollarSign, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Shared type definition locally for simplicity (matches database model)
interface Job {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    salaryRange?: string;
    type: string;
    createdAt: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPostForm, setShowPostForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Job>>({
        type: 'full-time',
    });

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs() {
        try {
            const data = await fetchAPI('/api/jobs');
            setJobs(data);
        } catch (error) {
            console.error('Failed to load jobs:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handlePostJob(e: React.FormEvent) {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                postedBy: 'user123', // Hardcoded recruiter ID for demo
            };

            const newJob = await fetchAPI('/api/jobs', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            setJobs([newJob, ...jobs]);
            setShowPostForm(false);
            setFormData({ type: 'full-time' }); // Reset form
            toast.success('Job posted successfully!');
        } catch (error) {
            toast.error('Failed to post job');
            console.error(error);
        }
    }

    return (
        <div className="container py-12 px-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Explore Opportunities</h1>
                    <p className="text-muted-foreground mt-1">
                        Find your next role at top companies.
                    </p>
                </div>
                <button
                    onClick={() => setShowPostForm(!showPostForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Post a Job
                </button>
            </div>

            {showPostForm && (
                <div className="mb-12 p-6 bg-card border rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
                    <form onSubmit={handlePostJob} className="grid gap-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Company</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.company || ''}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.location || ''}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Salary Range</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.salaryRange || ''}
                                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                                    placeholder="e.g. $100k - $120k"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                className="w-full p-2 border rounded-md"
                                rows={4}
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowPostForm(false)}
                                className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                                Publish Job
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">No jobs found. Be the first to post one!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="p-6 bg-card border rounded-lg hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-muted-foreground font-medium">{job.company}</p>
                                </div>
                                <span className={cn(
                                    "px-2 py-1 text-xs rounded-full font-medium capitalize",
                                    job.type === 'full-time' ? "bg-green-100 text-green-700" :
                                        job.type === 'contract' ? "bg-blue-100 text-blue-700" :
                                            "bg-gray-100 text-gray-700"
                                )}>
                                    {job.type}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </div>
                                {job.salaryRange && (
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        {job.salaryRange}
                                    </div>
                                )}
                                <div className="flex items-center gap-1 ml-auto text-xs">
                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
