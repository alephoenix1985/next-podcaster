import type {
  ApiEpisode,
  ApiFeedResponse,
  ApiPodcast,
  ApiPodcastDetailsResponse,
  ApiPodcastInfo,
  Episode,
  Podcast,
  PodcastDetails,
} from "@/shared/types";
import { apiClient } from "@/shared/lib/api-client";

const ITUNES_API_URL = "https://itunes.apple.com";
const CORS_PROXY_URL = "https://api.allorigins.win/get?url=";

let podcastCache: Podcast[] | null = null;

/**
 * Fetches the top 100 podcasts from the iTunes API.
 * @returns {Podcast[]} An array of top podcasts.
 */
export const getPodcasts = async (): Promise<Podcast[]> => {
  const url = `${ITUNES_API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
  const data = await apiClient<ApiFeedResponse>(url, {
    next: { revalidate: 86400 },
  });

  if (!data?.feed?.entry) return [];

  const podcasts = data.feed.entry.map(
    (p: ApiPodcast): Podcast => ({
      id: p.id.attributes["im:id"],
      title: p["im:name"].label,
      author: p["im:artist"].label,
      image: p["im:image"][2].label, // 170x170
      summary: p.summary.label,
    }),
  );

  podcastCache = podcasts;
  return podcasts;
};

/**
 * Fetches the details and episodes for a specific podcast using a CORS proxy.
 * @param {string} podcastId The ID of the podcast.
 * @returns {Promise<PodcastDetails | null>} The podcast details or null if not found.
 */
export const getPodcastDetails = async (
  podcastId: string,
): Promise<PodcastDetails | null> => {
  const lookupUrl = `${ITUNES_API_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
  const proxyUrl = `${CORS_PROXY_URL}${encodeURIComponent(lookupUrl)}`;
  const response = await apiClient<{ contents: string }>(proxyUrl, {
    next: { revalidate: 86400 },
  });

  if (!response || !response.contents) return null;
  const parsedData: ApiPodcastDetailsResponse | null = JSON.parse(
    response.contents,
  );

  if (!parsedData || !parsedData.results || parsedData.resultCount === 0) {
    return null;
  }

  /**
   * Type guard to check if an object is an ApiEpisode.
   * @returns {boolean} True if the item is an ApiEpisode.
   * @param e
   */
  const isApiEpisode = (
    e: ApiPodcastInfo | ApiEpisode,
  ): e is ApiEpisode & {
    wrapperType: "podcastEpisode";
  } => e.wrapperType === "podcastEpisode";

  /**
   * Type guard to check if an object is an ApiPodcastInfo.
   * @param {ApiPodcastInfo | ApiEpisode} item The item to check.
   * @returns {boolean} True if the item is an ApiPodcastInfo.
   */
  const isApiPodcastInfo = (
    item: ApiPodcastInfo | ApiEpisode,
  ): item is ApiPodcastInfo => {
    return (item as ApiPodcastInfo).collectionId !== undefined;
  };

  const podcastInfo = parsedData.results.find(isApiPodcastInfo);
  if (!podcastInfo || !isApiPodcastInfo(podcastInfo)) return null;

  if (!podcastCache) {
    await getPodcasts();
  }
  const allPodcasts = podcastCache || [];

  const mainPodcastInfo = allPodcasts.find((p) => p.id === podcastId);

  const episodes = parsedData.results.filter(isApiEpisode).map((e): Episode => {
    const d = new Date(e.releaseDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    let duration = "--:--";
    if (e.trackTimeMillis) {
      const totalSeconds = Math.floor(e.trackTimeMillis / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const hms = [hours, minutes, seconds]
        .map((v) => v.toString().padStart(2, "0"))
        .join(":");
      duration = hms.startsWith("00:") ? hms.substring(3) : hms;
    }

    return {
      id: e.trackId.toString(),
      title: e.trackName,
      date: formattedDate,
      duration: duration,
      description: String(e.description || ""),
      url: e.episodeUrl,
    };
  });

  return {
    id: podcastId,
    title: podcastInfo.collectionName,
    author: podcastInfo.artistName,
    image: podcastInfo.artworkUrl600,
    summary: mainPodcastInfo?.summary || "No summary available",
    episodes,
  };
};
