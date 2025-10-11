import {useContext} from 'react';
import {LoadingProviderContext} from '@/providers/loading.provider';

/**
 * Custom hook to access the global loading state.
 * @returns The loading context value.
 * @throws {Error} If used outside of a LoadingProvider.
 */
export const useLoading = () => {
    const context = useContext(LoadingProviderContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};