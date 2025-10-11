import {createContext} from "react";
import {Podcast, PodcastDetails} from "@/types";

export interface PodcastContextType {
    podcastInfo: Podcast | null;
    podcastDetails: PodcastDetails | null;
    isLoading: boolean;
}

export const PodcastContext = createContext<PodcastContextType>({
    podcastInfo: null,
    podcastDetails: null,
    isLoading: true,
});