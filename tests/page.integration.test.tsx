import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { useFetch } from '@/hooks/fetch.hook';
import { LoadingProvider } from '@/providers/loading.provider';

jest.mock('@/hooks/fetch.hook');

const mockUseFetch = useFetch as jest.Mock;

const mockPodcasts = {
    feed: {
        entry: [
            {
                id: {attributes: {'im:id': '1'}},
                'im:name': {label: 'The Joe Rogan Experience'},
                'im:artist': {label: 'Joe Rogan'},
                'im:image': [{label: 'https://example.com/image1.jpg', attributes: {height: '170'}}],
                summary: {label: 'Summary for Joe Rogan'}
            },
            {
                id: {attributes: {'im:id': '2'}},
                'im:name': {label: 'Crime Junkie'},
                'im:artist': {label: 'audiochuck'},
                'im:image': [{label: 'https://example.com/image2.jpg', attributes: {height: '170'}}],
                summary: {label: 'Summary for Crime Junkie'}
            },
        ],
    },
};

describe('Home Page: Top 100 Podcasts List', () => {
    beforeEach(() => {
        mockUseFetch.mockReturnValue({
            data: mockPodcasts,
            isLoading: false,
            error: null,
        });
    });

    it('should render the list of podcasts and allow filtering', async () => {
        render(
            <LoadingProvider>
                <Home/>
            </LoadingProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('The Joe Rogan Experience')).toBeInTheDocument();
            expect(screen.getByText('Crime Junkie')).toBeInTheDocument();
        });

        const filterInput = screen.getByPlaceholderText('Filter podcasts...');
        fireEvent.change(filterInput, {target: {value: 'Joe Rogan'}});

        expect(screen.getByText('The Joe Rogan Experience')).toBeInTheDocument();
        expect(screen.queryByText('Crime Junkie')).not.toBeInTheDocument();

        fireEvent.change(filterInput, {target: {value: 'audiochuck'}});

        expect(screen.queryByText('The Joe Rogan Experience')).not.toBeInTheDocument();
        expect(screen.getByText('Crime Junkie')).toBeInTheDocument();
    });
});