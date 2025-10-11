'use client';

import React, {JSX, useContext, useMemo} from 'react';
import Link from 'next/link';
import {LoadingProviderContext} from "@/providers/loading.provider";

/**
 * The application header component.
 * Displays the title and a loading indicator.
 * @returns {JSX.Element} The header component.
 */

export default function Header(): JSX.Element {
    const {loadingStates} = useContext(LoadingProviderContext);
    const isAnythingLoading = useMemo(() => {
        return loadingStates ? Object.values(loadingStates).some(state => state) : false;
    }, [loadingStates]);

    return (
        <header className="flex items-center justify-between border-b border-gray-200 p-4">
            <Link href="/" className="text-lg font-bold text-[var(--primary-color)] no-underline">Podcaster</Link>
            {isAnythingLoading && <div
                className="h-4 w-4 animate-ping flex items-center justify-center rounded-full bg-[var(--primary-color)]/20">
                <div className="h-2 w-2 animate-puplse rounded-full bg-[var(--primary-color)]"></div>
            </div>}
        </header>
    );
}