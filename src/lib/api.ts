// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
export const api = {
    async get(endpoint: string) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    },

    async post(endpoint: string, body: unknown, token?: string) {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    },

    async put(endpoint: string, body: unknown, token?: string) {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    },

    async patch(endpoint: string, body?: unknown, token?: string) {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    },

    async delete(endpoint: string, token?: string) {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    }
};

// Admin API helpers
export const adminApi = {
    getToken() {
        return localStorage.getItem('adminToken');
    },

    async get(endpoint: string) {
        const token = this.getToken();
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
        const data = await response.json();
        if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/fd-admin-portal';
            throw new Error('Session expired');
        }
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    },

    async post(endpoint: string, body: unknown) {
        return api.post(endpoint, body, this.getToken() || undefined);
    },

    async put(endpoint: string, body: unknown) {
        return api.put(endpoint, body, this.getToken() || undefined);
    },

    async patch(endpoint: string, body?: unknown) {
        return api.patch(endpoint, body, this.getToken() || undefined);
    },

    async delete(endpoint: string) {
        return api.delete(endpoint, this.getToken() || undefined);
    }
};

// Content API for public content fetching (no auth required)
export const contentApi = {
    async get(endpoint: string) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Request failed');
            return data;
        } catch (error) {
            console.error('Content API error:', error);
            return { data: [] };
        }
    },

    async post(endpoint: string, body: unknown | FormData) {
        try {
            const isFormData = body instanceof FormData;
            const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: isFormData ? body : JSON.stringify(body)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Request failed');
            return data;
        } catch (error) {
            console.error('Content API error:', error);
            throw error;
        }
    }
};

// Icon mapping for dynamic icons
export const iconMap: Record<string, string> = {
    Code: 'Code',
    Smartphone: 'Smartphone',
    Brain: 'Brain',
    Palette: 'Palette',
    Server: 'Server',
    Rocket: 'Rocket',
    Cpu: 'Cpu',
    Users: 'Users',
    Zap: 'Zap',
    Shield: 'Shield',
    Clock: 'Clock',
    Heart: 'Heart',
    Coffee: 'Coffee',
    Laptop: 'Laptop',
    Globe: 'Globe',
    Mail: 'Mail',
    MapPin: 'MapPin',
    Phone: 'Phone',
    Star: 'Star',
    Award: 'Award',
    TrendingUp: 'TrendingUp',
    BarChart: 'BarChart',
    Database: 'Database',
    Lock: 'Lock',
    Eye: 'Eye',
    Bell: 'Bell',
    UserCheck: 'UserCheck',
    FileText: 'FileText'
};
