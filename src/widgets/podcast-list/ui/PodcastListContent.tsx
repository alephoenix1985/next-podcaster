"use client";

import React, { useMemo, useState } from "react";
import { Podcast } from "@/shared/types";
import { FilterPodcasts } from "@/features/filter-podcasts/ui/FilterPodcasts";
import PodcastCard from "@/entities/podcast/ui/PodcastCard";

function PodcastGrid({
  podcasts,
  filter,
}: {
  podcasts: Podcast[];
  filter: string;
}) {
  const filteredPodcasts = useMemo(() => {
    if (!filter) return podcasts;
    const lowercasedFilter = filter.toLowerCase();
    return podcasts.filter(
      (p) =>
        p.title.toLowerCase().includes(lowercasedFilter) ||
        p.author.toLowerCase().includes(lowercasedFilter),
    );
  }, [podcasts, filter]);

  if (filteredPodcasts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No podcasts found matching your filter.
      </p>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredPodcasts.map((podcast, index) => (
        <PodcastCard key={podcast.id} podcast={podcast} priority={index < 4} />
      ))}
    </div>
  );
}

/**
 * A client component that handles the stateful logic for displaying the podcast list,
 * including filtering and scroll effects.
 * @param {{ podcasts: Podcast[] }} props The properties for the component.
 * @returns {JSX.Element} The interactive podcast list content.
 */
export function PodcastListContent({ podcasts }: { podcasts: Podcast[] }) {
  const [filter, setFilter] = useState("");

  return (
    <div className="relative pt-10 flex justify-end">
      <div className="fixed top-16 w-full md:w-auto right-0 z-10 bg-white px-8 shadow-white shadow-lg">
        <FilterPodcasts
          count={podcasts.length}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>
      <PodcastGrid podcasts={podcasts} filter={filter} />
    </div>
  );
}
