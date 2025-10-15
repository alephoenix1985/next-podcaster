"use client";

import { useCallback, useContext, useSyncExternalStore } from "react";
import {
  LoadingContext,
  LoadingManager,
} from "@/shared/lib/context/loading-context";

/**
 * A hook to interact with the global loading state manager.
 * @returns An object containing the loading manager instance.
 */
function useLoadingManager(): LoadingManager {
  const manager = useContext(LoadingContext);
  if (!manager) {
    throw new Error("useLoadingManager must be used within a LoadingProvider");
  }
  return manager;
}

/**
 * A custom hook to interact with the global loading state.
 * @returns {[boolean, (key: string, value: boolean) => void]} A tuple containing the current loading state and a function to set a loading state.
 */
export function useLoading(): [boolean, (key: string, value: boolean) => void] {
  const manager = useLoadingManager();

  const isAnythingLoading = useSyncExternalStore(
    (callback) => manager.subscribe(callback),
    () => manager.getSnapshot(),
    () => true, // Assume loading on the server initially
  );

  const setLoadingState = useCallback(
    (key: string, value: boolean) => {
      manager.set(key, value);
    },
    [manager],
  );

  return [isAnythingLoading, setLoadingState];
}
