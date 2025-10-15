import React, { JSX } from "react";
import { ServerLoadingIndicator } from "@/shared/ui/server-loading-indicator/ServerLoadingIndicator";

/**
 * A loading skeleton component for the podcast details page.
 * It mimics the layout of the final page to prevent layout shifts
 * and improve the user's perceived performance.
 * @returns {JSX.Element} The skeleton loader for the podcast page.
 */
export default function Loading(): JSX.Element {
  return (
    <>
      <ServerLoadingIndicator loadingKey="podcast-details" />
      <div className="space-y-4">
        <div className="h-12 w-1/3 animate-pulse rounded bg-gray-300 p-4 shadow-md"></div>
        <div className="h-96 w-full animate-pulse rounded bg-gray-300 p-4 shadow-md"></div>
      </div>
    </>
  );
}
