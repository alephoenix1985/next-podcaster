'use client';

import {useEffect} from 'react';

export const isPWACapable = () => "serviceWorker" in navigator;

/**
 * Registers the service worker.
 */
function registerServiceWorker() {
    if (isPWACapable()) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
}

/**
 * A client component to handle Service Worker registration.
 * @returns {null} This component does not render anything.
 */
export default function PWAProvider(): null {
    useEffect(() => {
        registerServiceWorker();
    }, []);

    return null;
}