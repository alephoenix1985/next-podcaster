'use client';

import React, {useState, useMemo, JSX, useEffect} from 'react';
import Link from 'next/link';
import {Podcast} from '@/types';
import PodcastCard from '@/components/podcast/podcast-card';
import {useLoading} from "@/hooks/loading.hook";

interface FilterablePodcastListProps {
    podcasts: Podcast[];
    isLoading: boolean;
}

/**
 * A client component to display and filter a list of podcasts.
 * @param {FilterablePodcastListProps} props - The component props.
 * @returns {JSX.Element} The filterable podcast list component.
 */
export default function PodcastList({podcasts, isLoading}: FilterablePodcastListProps): JSX.Element {
    const [filter, setFilter] = useState('');
    const {setComponentLoading} = useLoading();

    const filteredPodcasts = useMemo(() => {
        if (!podcasts) return [];
        return podcasts.filter(
            (podcast) =>
                podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
                podcast.author.toLowerCase().includes(filter.toLowerCase())
        );
    }, [podcasts, filter]);

    useEffect(() => {
        setComponentLoading('podcastList', isLoading);
        if (!isLoading) {
            setComponentLoading('initialLoading', false);
        }
    }, [isLoading, setComponentLoading]);

    return (
        <div className="relative flex h-[calc(100vh-4rem)] flex-col px-4">
            <div
                className="absolute top-0 right-6 sm:right-10 px-2 sm:px-4 sm:w-auto w-[calc(100%_-_4rem)] justify-center z-10 flex items-center sm:justify-end gap-4 bg-white py-4 shadow-white shadow-md">
                <span className="rounded bg-[var(--primary-color)] px-2 py-1 text-sm font-bold text-white">
                    {filteredPodcasts.length}
                </span>
                <input type="text" className="w-72 rounded border border-gray-300 px-3 py-1"
                       placeholder="Filter podcasts..." value={filter} onChange={(e) => setFilter(e.target.value)}/>
            </div>
            <div className="flex-grow overflow-y-auto pt-8">
                {isLoading ? (
                    <div
                        className="mb-2 grid grid-cols-1 mt-10 sm:mt-8 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({length: 12}).map((_, index) => (
                            <div key={index} className="animate-pulse h-auto pt-10 flex flex-col justify-end">
                                <div className="relative w-full pt-16 items-center rounded-md bg-gray-200 h-28"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredPodcasts.length > 0 ? (
                    <div
                        className="mb-2 grid grid-cols-1 mt-10 sm:mt-8 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredPodcasts.map((podcast) => (
                            <Link key={podcast.id} href={`/podcast/${podcast.id}`} passHref>
                                <PodcastCard podcast={podcast}/>
                            </Link>))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center"><p className="text-lg text-gray-500">No podcasts found matching your search.</p></div>
                )}
            </div>
        </div>
    );
}