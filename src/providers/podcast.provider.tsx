'use client';

import React, {JSX, useEffect, useMemo} from 'react';
import {useParams} from "next/navigation";
import {useLoading} from "@/hooks/loading.hook";
import {useFetch} from "@/hooks/fetch.hook";
import {
    findPodcastSummary,
    getPodcastDetailsUrl,
    getPodcastsUrl,
    ITunesLookupResponse,
    ITunesPodcastListResponse,
    transformToPodcastDetails
} from "@/services/podcast.service";
import {PodcastContext} from "@/contexts/podcast.context";

/**
 * Props for the PodcastProvider component.
 */
interface PodcastProviderProps {
    children: React.ReactNode;
}

/**
 * Provider for the podcast data context.
 * Fetches and transforms podcast data and provides it to its children.
 * @param {PodcastProviderProps} props - The component props.
 * @returns {JSX.Element} The podcast provider component.
 */
export function PodcastProvider({children}: PodcastProviderProps): JSX.Element {
    const params = useParams();
    const podcastId = params.podcastId as string;
    const {setComponentLoading} = useLoading();

    const {data: rawDetailsData, isLoading: isLoadingDetails} = useFetch<ITunesLookupResponse>(getPodcastDetailsUrl(podcastId));
    const {data: rawListData, isLoading: isLoadingList} = useFetch<ITunesPodcastListResponse>(getPodcastsUrl());

    const transformedData = useMemo(() => {
        if (!rawDetailsData || !rawListData) return null;
        const summary = findPodcastSummary(rawListData, podcastId);
        const details = transformToPodcastDetails(rawDetailsData, podcastId);
        if (details?.podcastInfo) details.podcastInfo.summary = summary;
        return details;
    }, [rawDetailsData, rawListData, podcastId]);

    useEffect(() => {
        const isLoading = isLoadingDetails || isLoadingList;
        setComponentLoading('podcastLayout', isLoading);
        if (!isLoading) {
            setComponentLoading('initialLoading', false);
        }
    }, [isLoadingDetails, isLoadingList, setComponentLoading]);

    const value = useMemo(() => ({
        podcastInfo: transformedData?.podcastInfo || null,
        podcastDetails: transformedData?.podcastDetails || null,
        isLoading: isLoadingDetails || isLoadingList
    }), [transformedData, isLoadingDetails, isLoadingList]);

    return (
        <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
    );
}