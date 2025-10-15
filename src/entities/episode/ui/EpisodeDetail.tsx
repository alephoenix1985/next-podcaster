import React, { JSX } from "react";
import { getPodcastDetails } from "@/shared/api/itunes-api";

interface EpisodeDetailProps {
  podcastId: string;
  episodeId: string;
}

/**
 * Fetches and renders the details of a specific episode.
 * @param {EpisodeDetailProps} props The properties for the component.
 * @returns {Promise<JSX.Element>} A promise that resolves to the episode content.
 */
export async function EpisodeDetail({
  podcastId,
  episodeId,
}: EpisodeDetailProps): Promise<JSX.Element> {
  const podcastDetails = await getPodcastDetails(podcastId);
  const episode = podcastDetails?.episodes.find(
    (e) => e.id.toString() === episodeId,
  );

  if (!episode) {
    return <div>Episode not found.</div>;
  }

  return (
    <div className="rounded p-4 shadow-[0_2px_4px_var(--shadow-color)]">
      <h2 className="mb-2 text-lg font-bold">{episode.title}</h2>
      <div
        className="prose prose-sm mb-6 italic"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
      <hr className="mb-6 border-0 border-t border-[var(--border-color)]" />
      <audio className="w-full" controls src={episode.url}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
