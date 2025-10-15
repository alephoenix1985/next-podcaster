"use client";

import React, { useEffect, JSX } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for the podcast detail route.
 * Catches errors during server-side data fetching and displays a fallback UI.
 * @param {ErrorProps} props The properties for the component.
 * @returns {JSX.Element} The error fallback component.
 */
export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
      <p className="text-red-500">
        Failed to load podcast details. This may be a temporary issue.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}
