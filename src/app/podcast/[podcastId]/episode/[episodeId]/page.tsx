import React, { JSX, Suspense } from "react";
import { ErrorBoundary } from "@/shared/ui/errors/ErrorBoundary";
import Loading from "@/app/podcast/loading";
import { EpisodeDetail } from "@/entities/episode/ui/EpisodeDetail";

interface EpisodePageProps {
  params: {
    podcastId: string;
    episodeId: string;
  };
}

/**
 * Page to display details of a specific episode, wrapped with Suspense and ErrorBoundary.
 * @param {EpisodePageProps} props The properties for the component.
 * @returns {JSX.Element} The episode detail page.
 */
export default async function EpisodePage({
  params,
}: EpisodePageProps): Promise<JSX.Element> {
  const { podcastId, episodeId } = await params;
  return (
    <ErrorBoundary
      fallback={<p>Sorry, there was an error loading the episode.</p>}
    >
      <Suspense fallback={<Loading />}>
        <EpisodeDetail podcastId={podcastId} episodeId={episodeId} />
      </Suspense>
    </ErrorBoundary>
  );
}
