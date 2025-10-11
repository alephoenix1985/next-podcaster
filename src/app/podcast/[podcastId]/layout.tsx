'use client';

import React, {JSX, Suspense, useContext, useEffect} from 'react';
import PodcastDetailCard from '@/components/podcast/podcast-detail-card';
import {PodcastContext} from "@/contexts/podcast.context";
import {PodcastProvider} from "@/providers/podcast.provider";
import {ErrorBoundary} from "@/components/common/error-boundary";
import Loading from "@/app/loading";
import {useLoading} from "@/hooks/loading.hook";

interface PodcastLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout for the podcast detail and episode pages.
 * It displays a sidebar with the podcast's main information.
 * @param {PodcastLayoutProps} props - The component props containing children.
 * @returns {JSX.Element} The podcast layout component.
 */
function PodcastLayoutContent({children}: PodcastLayoutProps): JSX.Element {
    const {podcastInfo} = useContext(PodcastContext);
    const {setComponentLoading} = useLoading();

    useEffect(() => {
        if (podcastInfo) {
            document.title = `Podcaster | ${podcastInfo.author}`;
            setComponentLoading('podcastDetail', false);
        }
    }, [podcastInfo, setComponentLoading]);

    return (
        <div className="px-8 pt-4 h-[calc(100vh-4rem)] overflow-y-auto md:grid md:grid-cols-[250px_1fr] md:items-start md:gap-x-24">
            <div className="mb-8 md:sticky md:top-8">
                {podcastInfo ? (
                    <PodcastDetailCard podcast={podcastInfo}/>
                ) : (
                    <div className="animate-pulse">
                        <div className="h-auto w-full md:w-48 md:h-48 aspect-square rounded bg-gray-200 mx-auto mb-4"></div>
                        <div className="h-px bg-gray-200 my-4"></div>
                        <div className="h-5 w-3/4 rounded bg-gray-200 mb-2"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200 mb-4"></div>
                        <div className="h-px bg-gray-200 my-4"></div>
                        <div className="h-4 w-1/4 rounded bg-gray-200 mb-2"></div>
                        <div className="h-16 w-full rounded bg-gray-200"></div>
                    </div>
                )}
            </div>
            <div className="min-w-0 mb-4 md:h-full">
                <ErrorBoundary fallback={<p>Sorry, there was an error loading the podcast details.</p>}>
                    <Suspense fallback={<Loading/>}>{children}</Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default function PodcastLayout({children}: PodcastLayoutProps): JSX.Element {
    return (
        <PodcastProvider>
            <PodcastLayoutContent>{children}</PodcastLayoutContent>
        </PodcastProvider>
    );
}