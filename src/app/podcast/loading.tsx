import React, {JSX} from 'react';

/**
 * A simple loading spinner component.
 * @returns {JSX.Element} The loading spinner.
 */
export default function Loading(): JSX.Element {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-[var(--primary-color)]">
      </div>
    </div>
  );
}