import React, { JSX } from "react";
import Link from "next/link";
import { getPodcastDetails } from "@/shared/api/itunes-api";

interface PodcastDetailPageProps {
  params: { podcastId: string };
}

/**
 * Page to display details of a specific podcast, including its episodes.
 * @param {PodcastDetailPageProps} props The properties for the component.
 * @returns {JSX.Element} The podcast detail page.
 */
export default async function PodcastDetailPage({
  params,
}: PodcastDetailPageProps): Promise<JSX.Element> {
  const { podcastId } = await params;
  const podcastDetails = await getPodcastDetails(podcastId);
  if (!podcastDetails) {
    return <div>Podcast not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="rounded p-2 shadow-[0_2px_4px_var(--shadow-color)]">
        <h3 className="text-lg font-bold">
          Episodes: {podcastDetails.episodes.length}
        </h3>
      </div>
      <div className="p-4 shadow-[0_2px_4px_var(--shadow-color)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b-2 border-[var(--border-color)] p-2 font-bold">
                Title
              </th>
              <th className="border-b-2 border-[var(--border-color)] p-2 font-bold">
                Date
              </th>
              <th className="border-b-2 border-[var(--border-color)] p-2 font-bold text-right">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {podcastDetails.episodes.map((episode) => (
              <tr
                key={episode.id}
                className="odd:bg-[#f9f9f9] hover:bg-[#f1f1f1]"
              >
                <td className="p-2 border-b border-[var(--border-color)]">
                  <Link
                    href={`/podcast/${podcastId}/episode/${episode.id}`}
                    className="text-[var(--primary-color)] no-underline"
                  >
                    {episode.title}
                  </Link>
                </td>
                <td className="border-b border-[var(--border-color)] p-2">
                  {episode.date}
                </td>
                <td className="border-b border-[var(--border-color)] p-2 text-right">
                  {episode.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
