'use client';

import {useEffect, useState} from 'react';

/**
 * A generic custom hook for fetching data.
 * It handles loading states, data, and errors.
 * @template T The expected type of the data to be fetched.
 * @param {string | null} url - The URL to fetch data from.
 * @returns {{ data: T | null; isLoading: boolean; error: Error | null }} An object containing the fetched data, loading state, and any error that occurred.
 */
export const useFetch = <T>(url: string | null) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result as T);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};