type CacheStatus = "pending" | "resolved" | "rejected";

interface CacheEntry<T> {
  status: CacheStatus;
  value: T | Promise<T> | Error;
}

/**
 * Creates a simple cache for React Suspense.
 * @returns An object with a `read` method to fetch or retrieve data from the cache.
 */
export function createSuspenseCache() {
  const cache = new Map<string, CacheEntry<unknown>>();

  return {
    read<T>(key: string, fetcher: () => Promise<T>): T {
      if (!cache.has(key)) {
        const promise = fetcher();
        const entry: CacheEntry<T> = {
          status: "pending",
          value: promise,
        };
        cache.set(key, entry);
        promise.then(
          (value) => {
            entry.status = "resolved";
            entry.value = value;
          },
          (error) => {
            entry.status = "rejected";
            entry.value = error;
          },
        );
      }

      const entry = cache.get(key)!;
      if (entry.status === "pending") throw entry.value;
      if (entry.status === "rejected") throw entry.value;
      return entry.value as T;
    },
  };
}
