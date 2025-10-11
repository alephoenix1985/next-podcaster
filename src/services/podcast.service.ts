import { Podcast, PodcastDetails } from "@/types";

interface ITunesPodcast {
    'im:name': { label: string };
    'im:image': { label: string; attributes: { height: string } }[];
    'im:artist': { label: string };
    summary: { label: string };
    id: { attributes: { 'im:id': string } };
}

export interface ITunesPodcastListResponse {
    feed: {
        entry: ITunesPodcast[];
    };
}

interface ITunesCollection {
    wrapperType: 'track';
    artistName: string;
    collectionName: string;
    collectionExplicitness: string;
    artworkUrl600: string;
    artworkUrl100: string;
    artworkUrl60: string;
    artworkUrl30: string;
}

interface ITunesEpisode {
    trackId: number;
    trackName: string;
    releaseDate: string;
    trackTimeMillis: number;
    description: string;
    episodeUrl: string;
}

export interface ITunesLookupResponse {
    resultCount: number;
    results: (
        ITunesCollection
        | (ITunesEpisode & { wrapperType: 'podcastEpisode' })
        )[];
}

const API_URL = 'https://itunes.apple.com';
export const getPodcastsUrl = () => `${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
export const getPodcastDetailsUrl = (podcastId: string) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`${API_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`

/**
 * Transforms the raw podcast list data from the API into the application's format.
 * @param {ITunesPodcastListResponse | null} data - The raw data from the fetch hook.
 * @returns {Podcast[]} The transformed list of podcasts.
 */
export const transformToPodcasts = (data: ITunesPodcastListResponse | null): Podcast[] => {
    if (!data?.feed?.entry) return [];

    return data.feed.entry.map((p: ITunesPodcast) => {
        const images = p['im:image'];
        const srcSet = images
            .map((img) => `${img.label} ${img.attributes.height}w`)
            .join(', ');
        return {
            id: p.id.attributes['im:id'],
            title: p['im:name'].label,
            author: p['im:artist'].label,
            image: { src: images[images.length - 1].label, srcSet },
            summary: p.summary.label
        };
    });
}

/**
 * Finds and returns the summary for a specific podcast from the main list.
 * @param {ITunesPodcastListResponse} data - The raw data from the main podcast list fetch.
 * @param {string} podcastId - The ID of the podcast to find.
 * @returns {string} The summary of the podcast, or an empty string if not found.
 */
export const findPodcastSummary = (data: ITunesPodcastListResponse, podcastId: string): string => {
    const podcastEntry = data?.feed?.entry.find(p => p.id.attributes['im:id'] === podcastId);
    return podcastEntry?.summary.label || '';
}

/**
 * Transforms the raw podcast details data from the API into the application's format.
 * @param {ITunesLookupResponse | null} contents - The raw data from the fetch hook.
 * @param {string} podcastId - The ID of the podcast.
 * @returns {{podcastInfo: Podcast, podcastDetails: PodcastDetails} | null} The transformed podcast details or null.
 */
export const transformToPodcastDetails = (contents: ITunesLookupResponse | null, podcastId: string): { podcastInfo: Podcast, podcastDetails: PodcastDetails } | null => {
    if (!contents || contents.resultCount === 0) return null;

    const podcastInfoResult = contents.results.find((p): p is ITunesCollection => p.wrapperType === 'track');

    if (!podcastInfoResult) return null;

    const srcSet = `${podcastInfoResult.artworkUrl30} 30w, ${podcastInfoResult.artworkUrl60} 60w, ${podcastInfoResult.artworkUrl100} 100w, ${podcastInfoResult.artworkUrl600} 600w`;

    const podcastInfo: Podcast = {
        id: podcastId,
        title: podcastInfoResult.collectionName,
        author: podcastInfoResult.artistName,
        image: {
            src: podcastInfoResult.artworkUrl600,
            srcSet: srcSet,
        },
        summary: '' // No summary available from this endpoint for the podcast itself
    };

    const episodes = contents.results
        .filter((e): e is (ITunesEpisode & { wrapperType: 'podcastEpisode' }) => e.wrapperType === 'podcastEpisode')
        .map((e: ITunesEpisode) => {
            const d = new Date(e.releaseDate);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            let duration = '---';
            if (e.trackTimeMillis) {
                const totalSeconds = Math.floor(e.trackTimeMillis / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                const durationString = [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
                duration = durationString.startsWith("00:") ? durationString.substring(3) : durationString;
            }

            return {
                id: e.trackId,
                title: e.trackName,
                date: formattedDate,
                duration: duration,
                description: e.description,
                url: e.episodeUrl,
            };
        });

    return {
        podcastInfo,
        podcastDetails: { ...podcastInfo, episodes }
    };
}