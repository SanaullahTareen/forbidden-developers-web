import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, type ReactNode } from 'react';
import { API_BASE_URL } from '../lib/api';

interface ProtectedRouteProps {
    children: ReactNode;
}

interface Admin {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface ApiResponse {
    success: boolean;
    data?: Admin;
    message?: string;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('adminToken');

            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                // Verify token with backend
                const response = await fetch(`${API_BASE_URL}/admin/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data: ApiResponse = await response.json();

                if (response.ok && data.success) {
                    setIsAuthenticated(true);
                } else {
                    // Token invalid, clear it
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                    setIsAuthenticated(false);
                }
            } catch {
                // Token expired or invalid
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [location.pathname]);

    // Show loading spinner while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/fd-admin-portal" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
