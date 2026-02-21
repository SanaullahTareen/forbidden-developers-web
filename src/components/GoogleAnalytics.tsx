import { useEffect, useState } from 'react';
import { contentApi } from '../lib/api';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

const GoogleAnalytics = () => {
    const [gaId, setGaId] = useState<string | null>(null);

    useEffect(() => {
        const fetchGaId = async () => {
            try {
                const response = await contentApi.get('/content/settings');
                if (response.data?.googleAnalyticsId) {
                    setGaId(response.data.googleAnalyticsId);
                }
            } catch (error) {
                console.error('Failed to fetch GA ID:', error);
            }
        };
        fetchGaId();
    }, []);

    useEffect(() => {
        if (!gaId || gaId.trim() === '') return;

        // Check if script already exists
        if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
            return;
        }

        // Load Google Analytics script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: unknown[]) {
            window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', gaId, {
            page_path: window.location.pathname,
        });

        // Track page views on route change
        const handleRouteChange = () => {
            window.gtag('config', gaId, {
                page_path: window.location.pathname,
            });
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [gaId]);

    return null; // This component doesn't render anything
};

export default GoogleAnalytics;
