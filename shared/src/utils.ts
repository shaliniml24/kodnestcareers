// Common Utilities

export const normalizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US').format(date);
};
