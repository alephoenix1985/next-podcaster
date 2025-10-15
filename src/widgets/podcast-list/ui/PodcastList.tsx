import React, { JSX, Suspense } from "react";
import { Podcast } from "@/shared/types";
import { getPodcasts } from "@/shared/api/itunes-api";
import Loading from "@/app/loading";
import { PodcastListContent } from "./PodcastListContent";

async function PodcastData() {
  const podcasts: Podcast[] = await getPodcasts();
  return <PodcastListContent podcasts={podcasts} />;
}

export function PodcastList(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <PodcastData />
    </Suspense>
  );
}
