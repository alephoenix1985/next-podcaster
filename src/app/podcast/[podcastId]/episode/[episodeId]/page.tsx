'use client';

import React, {JSX, useContext, useEffect, useMemo} from 'react';
import {useParams} from "next/navigation";
import {PodcastContext} from "@/contexts/podcast.context";

/**
 * Page to display details of a specific episode.
 * @returns {JSX.Element | null} The episode detail page.
 */
export default function EpisodePage(): JSX.Element | null {
    const {podcastDetails, podcastInfo, isLoading} = useContext(PodcastContext);
    const params = useParams();
    const episodeId = params.episodeId as string;

    const episode = useMemo(() => podcastDetails?.episodes.find(
        (e) => e.id.toString() === episodeId
    ), [podcastDetails, episodeId]);

    useEffect(() => {
        if (podcastInfo && episode) {
            document.title = `Podcaster | ${podcastInfo.author} - ${episode.title}`;
        }
    }, [podcastInfo, episode]);

    if (isLoading || !episode) {
        return null;
    }

    return (
        <div className="rounded p-4 shadow-[0_2px_4px_var(--shadow-color)]">
            <h2 className="mb-2 text-lg font-bold">{episode.title}</h2>
            <p
                className="mb-6 text-sm italic"
                dangerouslySetInnerHTML={{__html: episode.description}}
            />
            <hr className="mb-6 border-0 border-t border-[var(--border-color)]"/>
            <audio className="w-full" controls src={episode.url}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}