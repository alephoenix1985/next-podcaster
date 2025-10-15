"use client";

import { useEffect } from "react";
import { useLoading } from "@/shared/lib/hooks/loading.hook";

/**
 * A client component to update the global loading state when the podcast detail page has loaded.
 * @returns {null} This component does not render anything.
 */
export function PodcastDetailClientState() {
  const [, setLoadingState] = useLoading();
  useEffect(() => {
    setLoadingState("redirecting-to-detail", false);
  }, [setLoadingState]);
  return null;
}
