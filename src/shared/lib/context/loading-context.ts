import { createContext } from "react";

/**
 * Manages loading states and notifies subscribers of changes.
 * This class-based approach ensures referential stability for the context value.
 */
export class LoadingManager {
  private loadingStates: Map<string, boolean>;
  private subscribers = new Set<() => void>();

  /**
   * Subscribes a component to loading state changes.
   * @returns {() => void} A function to unsubscribe.
   * @param initialState
   */
  constructor(initialState?: Map<string, boolean>) {
    this.loadingStates = initialState || new Map();
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  set(key: string, value: boolean) {
    this.loadingStates.set(key, value);
    this.subscribers.forEach((callback) => callback());
  }

  getIsAnythingLoading(): boolean {
    return Array.from(this.loadingStates.values()).some((v) => v);
  }

  getSnapshot(): boolean {
    return this.getIsAnythingLoading();
  }
}

export const LoadingContext = createContext<LoadingManager | null>(null);
