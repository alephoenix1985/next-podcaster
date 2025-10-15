import React, { JSX } from "react";

interface FilterPodcastsProps {
  count: number;
  filter: string;
  onFilterChange: (value: string) => void;
}

/**
 * UI component for filtering the podcast list.
 * @param {FilterPodcastsProps} props The properties for the component.
 * @returns {JSX.Element} The filter input component.
 */
export function FilterPodcasts({
  count,
  filter,
  onFilterChange,
}: FilterPodcastsProps): JSX.Element {
  return (
    <div className="flex items-center px-2 py-2 justify-end gap-4">
      <span className="rounded-lg bg-[var(--primary-color)] px-3 py-1 text-sm font-bold text-white">
        {count}
      </span>
      <input
        type="text"
        placeholder="Filter podcasts..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="rounded-lg w-full md:w-60 border px-4 py-2"
      />
    </div>
  );
}
