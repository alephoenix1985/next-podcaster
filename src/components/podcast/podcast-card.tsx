import React from 'react';
import {Podcast} from '@/types';
import Image from "@/components/common/image";
import {useLoading} from "@/hooks/loading.hook";

interface PodcastCardProps {
    podcast: Podcast;
}

/**
 * A card component to display a summary of a podcast.
 * @param {PodcastCardProps} props - The component props.
 * @returns {JSX.Element} The podcast card component.
 */
const PodcastCard = React.forwardRef<
    HTMLDivElement,
    PodcastCardProps
>
    (({podcast}, ref) => {
        const {setComponentLoading} = useLoading();
        const handleClick = () => {
            setComponentLoading('podcastDetail', true);
        };

        return (
            <div className="h-auto pt-10 flex flex-col justify-end" onClick={handleClick}>
                <div
                    className="relative flex flex-col justify-end w-full pt-16 items-center rounded-md text-center shadow-[4px_2px_8px_var(--shadow-color)]"
                    ref={ref}
                >
                    <Image
                        src={podcast.image.src} srcSet={podcast.image.srcSet || ''} alt={podcast.title}
                        sizes="(max-width: 640px) 100px, 100px"
                        className="absolute -top-10 h-[100px] w-[100px]"
                        imageClassName="rounded-full object-cover"
                        skeletonClassName="rounded-full"
                        skeleton={<div className="animate-pulse bg-gray-200 rounded-full h-full w-full"></div>}
                    />
                    <div className={"relative flex flex-col px-4 pb-4 h-auto w-full"}>
                        <h3 className="text-sm font-bold uppercase">{podcast.title}</h3>
                        <p className="text-xs text-[#666]">Author: {podcast.author}</p>
                    </div>
                </div>
            </div>
        );
    });

PodcastCard.displayName = 'PodcastCard';

export default PodcastCard;