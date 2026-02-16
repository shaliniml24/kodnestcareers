'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { User, Mail, Briefcase, Code } from 'lucide-react';

interface ProfileData {
    userId: string;
    email: string;
    fullName: string;
    bio?: string;
    skills?: string;
    role: string;
}

const MOCK_USER_ID = 'user123'; // Simulating logged-in user

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<ProfileData>>({});

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            const data = await fetchAPI(`/api/profiles/${MOCK_USER_ID}`);
            setProfile(data);
            setFormData(data);
        } catch (error) {
            console.error('Failed to load profile:', error);
            // If 404, we might want to show a "Create Profile" form initially
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const payload = {
                userId: MOCK_USER_ID,
                email: formData.email || 'test@kodnest.com', // fallback for demo
                ...formData,
            };

            const updatedProfile = await fetchAPI('/api/profiles', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            setProfile(updatedProfile);
            setIsEditing(false);
            toast.success('Profile saved successfully!');
        } catch (error) {
            toast.error('Failed to save profile');
            console.error(error);
        }
    }

    if (loading) {
        return <div className="flex justify-center p-12">Loading profile...</div>;
    }

    return (
        <div className="container max-w-2xl py-12 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={formData.fullName || ''}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            value={formData.bio || ''}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={formData.skills || ''}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="React, Node.js, Python"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Save Profile
                    </button>
                </form>
            ) : profile ? (
                <div className="bg-card p-8 rounded-lg border shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                            <p className="text-muted-foreground capitalize">{profile.role}</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="w-5 h-5" />
                            <span>{profile.email}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Briefcase className="w-5 h-5 mt-1 text-muted-foreground" />
                            <p>{profile.bio || 'No bio provided'}</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Code className="w-5 h-5 mt-1 text-muted-foreground" />
                            <div className="flex flex-wrap gap-2">
                                {profile.skills?.split(',').map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                                        {skill.trim()}
                                    </span>
                                )) || <span>No skills listed</span>}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground mb-4">You haven't created a profile yet.</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Create Your Profile
                    </button>
                </div>
            )}
        </div>
    );
}
