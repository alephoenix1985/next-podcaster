import React, { JSX, Suspense } from "react";
import { getPodcastDetails } from "@/shared/api/itunes-api";
import PodcastDetailCard from "@/entities/podcast/ui/PodcastDetailCard";
import Loading from "../loading";
import { ErrorBoundary } from "@/shared/ui/errors/ErrorBoundary";
import { ErrorFallback } from "@/shared/ui/errors/ErrorFallback";

interface PodcastLayoutProps {
  children: React.ReactNode;
  params: { podcastId: string } | Promise<{ podcastId: string }>;
}

async function PodcastContent({
  podcastId,
  children,
}: {
  podcastId: string;
  children: React.ReactNode;
}) {
  const podcast = await getPodcastDetails(podcastId);

  if (!podcast) {
    return <div>Podcast not found.</div>;
  }

  return (
    <>
      <PodcastDetailCard podcast={podcast} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

/**
 * Layout for podcast detail pages. It displays a sidebar with the podcast summary
 * and the main content area for episodes or episode details.
 * @param {PodcastLayoutProps} props The properties for the component.
 * @returns {JSX.Element} The layout component.
 */
export default async function PodcastLayout({
  children,
  params,
}: PodcastLayoutProps): Promise<JSX.Element> {
  const resolvedParams = await params;
  return (
    <div className="grid grid-cols-1 gap-12 p-8 md:grid-cols-[300px_1fr]">
      <ErrorBoundary
        fallback={<ErrorFallback message="Could not load podcast details." />}
      >
        <Suspense fallback={<Loading />}>
          <PodcastContent podcastId={resolvedParams.podcastId}>
            {children}
          </PodcastContent>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
