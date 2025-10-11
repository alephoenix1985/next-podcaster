import {useMemo} from "react";

/**
 * A simple cache to store fetch promises and their results.
 */
const cache = new Map<string, { read: () => unknown }>();

/**
 * Creates a resource that integrates with React Suspense.
 * It wraps a fetch promise and provides a `read` method.
 * @param {string} url - The URL to fetch.
 * @returns {{read: () => any}} A resource object with a read method.
 */
function createSuspenseResource<T>(url: string): { read: () => T | unknown } {
    let status: 'pending' | 'success' | 'error' = 'pending';
    let result: T | Error;

    const suspender = fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            status = 'success';
            result = data as T;
        }).catch(error => {
            status = 'error';
            result = error;
        });

    return {
        read(): T | unknown {
            if (status === 'pending') {
                throw suspender; // Suspense catches this promise
            } else if (status === 'error') {
                throw result; // ErrorBoundary catches this error
            } else {
                return result as T;
            }
        },
    };
}

/**
 * A custom hook for fetching data that integrates with React Suspense.
 * @template T The expected type of the data.
 * @param {string | null} url - The URL to fetch from.
 * @returns {T | null} The fetched data.
 */
export const useSuspenseFetch = <T>(url: string | null): T | null => {
    const resource = useMemo(() => {
        if (!url) return null;
        if (!cache.has(url)) {;
            cache.set(url, createSuspenseResource<T>(url));
        }
        return cache.get(url);
    }, [url]);

    return resource ? (resource.read() as T) : null;
};