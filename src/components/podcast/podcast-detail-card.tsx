import React, { JSX } from 'react';
import Link from 'next/link';
import { Podcast } from '@/types';
import Image from "@/components/common/image";

interface PodcastDetailCardProps {
  podcast: Podcast;
}

/**
 * A card component for the sidebar on detail pages, showing podcast info.
 * @param {PodcastDetailCardProps} props - The component props.
 * @returns {JSX.Element} The podcast detail card component.
 */
export default function PodcastDetailCard({
  podcast,
}: PodcastDetailCardProps): JSX.Element {
  return (
    <Link href={`/podcast/${podcast.id}`} className="flex flex-col rounded p-4 shadow-[0_2px_4px_var(--shadow-color)] no-underline text-inherit">
      <div className="mb-4">
          <Image
              src={podcast.image.src} srcSet={podcast.image.srcSet || ''} alt={podcast.title}
              sizes="(max-width: 768px) 100vw, 200px" width={200} height={200}
              className="relative mb-4 h-auto w-full rounded object-cover"
              skeleton={<div className="animate-pulse bg-gray-200 mb-4 h-auto w-full aspect-square rounded"></div>}
          />
      </div>
      <hr className="my-4 border-0 border-t border-[var(--border-color)]" />
      <div>
        <h2 className="text-[1.1rem] font-bold">{podcast.title}</h2>
        <p className="mb-4 text-base italic">by {podcast.author}</p>
      </div>
      <hr className="my-4 border-0 border-t border-[var(--border-color)]" />
      <p className="font-bold">Description:</p>
      <p className="break-words text-[0.9rem] italic">{podcast.summary}</p>
    </Link>
  );
}