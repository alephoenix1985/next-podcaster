export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  summary: string;
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  url: string;
}

export interface PodcastDetails extends Podcast {
  episodes: Episode[];
}

// Types for iTunes API responses
export interface ApiPodcast {
  "im:name": { label: string };
  "im:image": { label: string; attributes: { height: string } }[];
  "im:artist": { label: string };
  id: { attributes: { "im:id": string } };
  summary: { label: string };
}

export interface ApiFeedResponse {
  feed: {
    entry: ApiPodcast[];
  };
}

export interface ApiEpisode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  description: string;
  episodeUrl: string;
  wrapperType: "podcastEpisode";
}

export interface ApiPodcastInfo {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  wrapperType: "track";
}

export interface ApiPodcastDetailsResponse {
  resultCount: number;
  results: (ApiPodcastInfo | ApiEpisode)[];
}
