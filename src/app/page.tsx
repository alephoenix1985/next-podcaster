'use client';

import React, {JSX, Suspense, useEffect} from 'react';
import Loading from "@/app/loading";
import {ErrorBoundary} from "@/components/common/error-boundary";
import PodcastData from "@/components/podcast/podcast-data";
import {useLoading} from "@/hooks/loading.hook";

/**
 * The home page component that displays a list of podcasts.
 * @returns {JSX.Element} The home page component.
 */
export default function Home(): JSX.Element {
    const {setComponentLoading} = useLoading();
    useEffect(() => {
        document.title = 'Podcaster | List';
        setComponentLoading('initialLoading', false);
    }, [setComponentLoading]);

    return (
        <ErrorBoundary fallback={<p>Sorry, there was an error loading the podcasts.</p>}>
            <Suspense fallback={<Loading/>}>
                <PodcastData/>
            </Suspense>
        </ErrorBoundary>
    );
}
