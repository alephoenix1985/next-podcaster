/**
 * @file Centralized API client for fetch requests.
 */

class ApiError extends Error {
  url: string;
  constructor(message: string, url: string) {
    super(message);
    this.name = "ApiError";
    this.url = url;
  }
}

/**
 * A generic API client for making fetch requests.
 * It centralizes response and error handling.
 * @template T The expected type of the JSON response.
 * @param {string} url The URL to fetch.
 * @param {RequestInit} [options] Optional fetch options.
 * @returns {Promise<T>} A promise that resolves with the parsed JSON data.
 * @throws {Error} Throws an error if the network request fails or the response is not ok.
 */
export async function apiClient<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorInfo = await response.text();
      throw new ApiError(
        `API Error: ${response.status} ${response.statusText} - ${errorInfo}`,
        url,
      );
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API Client Error: Failed to fetch from ${url}`, error);
    throw error;
  }
}
