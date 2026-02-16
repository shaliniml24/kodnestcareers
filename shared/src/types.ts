// Common Types

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'candidate' | 'recruiter';
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthPayload {
    userId: string;
    email: string;
    role: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
