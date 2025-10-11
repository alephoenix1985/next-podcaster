export interface PodcastImage {
    src: string;
    srcSet: string;
}
/**
 * Represents a single podcast in the main list.
 */
export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: PodcastImage;
  summary: string;
}

/**
 * Represents a single episode of a podcast.
 */
export interface Episode {
  id: number;
  title: string;
  date: string;
  duration: string;
  url: string;
  description: string;
}

/**
 * Represents the detailed information of a podcast, including its episodes.
 * It extends the basic Podcast type.
 */
export interface PodcastDetails extends Podcast {
  episodes: Episode[];
}