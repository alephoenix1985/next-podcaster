"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { LoadingIndicator } from "./LoadingIndicator";

/**
 * The application header widget.
 * Displays the title and a global loading indicator.
 * @returns {JSX.Element} The header component.
 */
export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 z-10 w-full bg-white/80 backdrop-blur-sm flex items-center justify-between border-b border-gray-200 p-4">
      <Link
        href="/"
        className="text-lg font-bold text-[var(--primary-color)] no-underline"
      >
        Podcaster
      </Link>
      <LoadingIndicator />
    </header>
  );
}
