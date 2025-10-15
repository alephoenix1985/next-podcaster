import React, { JSX } from "react";
import Link from "next/link";
import { Podcast } from "@/shared/types";
import { Image } from "@/shared/ui/image/Image";
import { PodcastDetailClientState } from "./PodcastDetailClientState";

interface PodcastDetailCardProps {
  podcast: Podcast;
}

/**
 * A card component to display summary details of a podcast on the detail pages.
 * @param {PodcastDetailCardProps} props The properties for the component.
 * @returns {JSX.Element} The podcast detail card component.
 */
export default async function PodcastDetailCard({
  podcast,
}: PodcastDetailCardProps): Promise<JSX.Element> {
  return (
    <aside className="flex flex-col self-start rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <PodcastDetailClientState />
      <Link
        href={`/podcast/${podcast.id}`}
        className={"items-center w-full flex"}
      >
        {await (
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={200}
            height={200}
            className="mx-auto rounded-md"
            skeletonClassName="h-[170px] w-[170px] mx-auto rounded-md"
          />
        )}
      </Link>
      <hr className="my-5 w-full border-gray-200" />
      <Link
        href={`/podcast/${podcast.id}`}
        className="font-bold no-underline hover:underline text-left"
      >
        {podcast.title}
      </Link>
      <p className="text-sm text-gray-600 text-left italic">
        by {podcast.author}
      </p>
      <hr className="my-5 w-full border-gray-200" />
      <p className="font-bold text-left">Description:</p>
      <p className="text-sm text-gray-600 break-words text-left italic">
        {podcast.summary}
      </p>
    </aside>
  );
}
