"use client";

import React, { JSX } from "react";

interface ErrorFallbackProps {
  message: string;
  onRetry?: () => void;
}

/**
 * A client component to display an error message and a retry button.
 * @param {ErrorFallbackProps} props The properties for the component.
 * @returns {JSX.Element} The error fallback UI.
 */
export function ErrorFallback({
  message,
  onRetry,
}: ErrorFallbackProps): JSX.Element {
  return (
    <div className="text-center">
      <p className="text-red-500">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white transition-opacity hover:opacity-80"
      >
        Retry
      </button>
    </div>
  );
}
