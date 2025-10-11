'use client';

import React, {JSX, useMemo} from 'react';
import PodcastList from "@/components/podcast/podcast-list";
import {getPodcastsUrl, ITunesPodcastListResponse, transformToPodcasts} from "@/services/podcast.service";
import {useSuspenseFetch} from "@/hooks/suspense-fetch.hook";

/**
 * A component that fetches and displays the podcast list using Suspense.
 * @returns {JSX.Element} The podcast list component.
 */
export default function PodcastData(): JSX.Element {
    const rawData = useSuspenseFetch<ITunesPodcastListResponse>(getPodcastsUrl());
    const podcasts = useMemo(() => rawData ? transformToPodcasts(rawData) : [], [rawData]);
    return (
        <PodcastList
            podcasts={podcasts}
            isLoading={!rawData}
        />
    );
}