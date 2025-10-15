"use client";

import React, { JSX, MouseEvent } from "react";
import Link from "next/link";
import { Podcast } from "@/shared/types";
import { Image } from "@/shared/ui/image/Image";
import { useLoading } from "@/shared/lib/hooks/loading.hook";
import { useRouter } from "next/navigation";

interface PodcastCardProps {
  podcast: Podcast;
  priority?: boolean;
}

/**
 * A card component to display a podcast in a list.
 * @param {PodcastCardProps} props The properties for the component.
 * @returns {JSX.Element} The podcast card component.
 */
export default function PodcastCard({
  podcast,
  priority = false,
}: PodcastCardProps): JSX.Element {
  const [, setLoadingState] = useLoading();
  const router = useRouter();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoadingState("redirecting-to-detail", true);
    router.push(`/podcast/${podcast.id}`);
  };

  return (
    <Link
      href={`/podcast/${podcast.id}`}
      className="mt-16 text-center no-underline"
      onClick={handleClick}
    >
      <div className="relative mb-16 rounded-lg p-4 pt-20 text-black shadow-[0px_3px_12px_rgb(0,0,0,0.1)] transition-transform duration-300 hover:scale-105">
        <Image
          src={podcast.image}
          alt={podcast.title}
          width={100}
          height={100}
          priority={priority}
          className="absolute overflow-hidden -top-12 left-1/2 -translate-x-1/2 rounded-full"
          skeletonClassName="h-[100px] w-[100px] absolute -top-12 left-1/2 -translate-x-1/2 rounded-full border"
        />
        <h2 className="truncate text-sm font-bold uppercase">
          {podcast.title}
        </h2>
        <p className="truncate text-sm text-gray-600">
          Author: {podcast.author}
        </p>
      </div>
    </Link>
  );
}
