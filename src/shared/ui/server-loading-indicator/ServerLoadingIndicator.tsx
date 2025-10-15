"use client";

import { useEffect } from "react";
import { useLoading } from "@/shared/lib/hooks/loading.hook";

interface ServerLoadingIndicatorProps {
  loadingKey: string;
}

/**
 * A client component that updates the global loading context when rendered by a server-side Suspense boundary.
 * @param {ServerLoadingIndicatorProps} props The component props.
 */
export function ServerLoadingIndicator({
  loadingKey,
}: ServerLoadingIndicatorProps) {
  const [, setLoadingState] = useLoading();

  useEffect(() => {
    setLoadingState(loadingKey, true);
    return () => setLoadingState(loadingKey, false);
  }, [setLoadingState, loadingKey]);

  return null;
}
