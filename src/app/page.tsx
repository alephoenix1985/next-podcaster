import React, { JSX } from "react";
import { PodcastList } from "@/widgets/podcast-list/ui/PodcastList";

/**
 * The main page of the application, displaying the top podcasts.
 * @returns {JSX.Element} The main page component.
 */
export default function Page(): JSX.Element {
  return (
    <div className="px-8 pt-4">
      <PodcastList />
    </div>
  );
}
