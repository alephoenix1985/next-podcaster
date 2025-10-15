"use client";

import React, { JSX, useEffect } from "react";
import { useLoading } from "@/shared/lib/hooks/loading.hook";

/**
 * A client component that subscribes to the global loading state
 * and displays an indicator when any part of the app is loading.
 * @returns {JSX.Element | null} The loading indicator or null.
 */
export function LoadingIndicator(): JSX.Element | null {
  const [isAnythingLoading] = useLoading();
  useEffect(() => {
    console.log("loading changed:", isAnythingLoading);
  }, [isAnythingLoading]);

  if (!isAnythingLoading) return null;

  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <div className="absolute h-full w-full animate-ping rounded-full bg-[var(--primary-color)] opacity-75"></div>
      <div className="relative h-2 w-2 rounded-full bg-[var(--primary-color)]"></div>
    </div>
  );
}
