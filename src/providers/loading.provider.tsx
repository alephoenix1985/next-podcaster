'use client';

import React, {createContext, useState, useMemo, JSX, useCallback} from 'react';

interface LoadingStates {
    [key: string]: boolean;
}

interface LoadingContextType {
    loadingStates: LoadingStates | undefined;
    setComponentLoading: (key: string, isLoading: boolean) => void;
}

export const LoadingProviderContext = createContext<LoadingContextType>({
    loadingStates: undefined,
    setComponentLoading: () => {
    }
});

/**
 * Provider for the global loading states.
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child elements to render.
 * @returns {JSX.Element} The loading provider component.
 */
export function LoadingProvider({children}: { children: React.ReactNode; }): JSX.Element {
    const [loadingStates, setLoadingStates] = useState<LoadingStates>({initialLoading: true});

    const setComponentLoading = useCallback((key: string, isLoading: boolean) => {
        setLoadingStates(prevStates => ({...prevStates, [key]: isLoading}));
    }, []);

    const value = useMemo(() => ({loadingStates, setComponentLoading}), [loadingStates, setComponentLoading]);

    return (
        <LoadingProviderContext.Provider value={value}>{children}</LoadingProviderContext.Provider>
    );
}