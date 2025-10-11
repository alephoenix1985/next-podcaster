import {renderHook, waitFor} from '@testing-library/react';
import {useFetch} from '@/hooks/fetch.hook';

/**
 * Mock the global fetch function
 */
global.fetch = jest.fn();

describe('useFetch hook', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should return data on successful fetch', async () => {
        const mockData = {message: 'success'};
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const {result} = renderHook(() => useFetch('https://api.example.com/data'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should return an error on failed fetch', async () => {
        const errorMessage = 'HTTP error! status: 404';
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const {result} = renderHook(() => useFetch('https://api.example.com/data'));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.data).toBeNull();
        expect(result.current.error).toEqual(new Error(errorMessage));
    });

    it('should not fetch if url is null', () => {
        const {result} = renderHook(() => useFetch(null));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
        expect(fetch).not.toHaveBeenCalled();
    });
});