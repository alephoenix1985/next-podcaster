import {transformToPodcasts, transformToPodcastDetails} from '@/services/podcast.service';

describe('podcast.service', () => {
    describe('transformToPodcasts', () => {
        it('should transform raw podcast data correctly', () => {
            const rawData = {
                feed: {
                    entry: [
                        {
                            'im:name': {label: 'Podcast 1'},
                            'im:artist': {label: 'Author 1'},
                            'im:image': [{label: 'image1_small.jpg', attributes: {height: '55'}}, {label: 'image1.jpg', attributes: {height: '170'}}],
                            id: {attributes: {'im:id': '1'}},
                            summary: {label: 'Summary 1'}
                        },
                        {
                            'im:name': {label: 'Podcast 2'},
                            'im:artist': {label: 'Author 2'},
                            'im:image': [{label: 'image2_small.jpg', attributes: {height: '55'}}, {label: 'image2.jpg', attributes: {height: '170'}}],
                            id: {attributes: {'im:id': '2'}},
                            summary: {label: 'Summary 2'}
                        },
                    ],
                },
            };

            const expectedPodcasts = [
                {id: '1', title: 'Podcast 1', author: 'Author 1', image: {src: 'image1.jpg', srcSet: 'image1_small.jpg 55w, image1.jpg 170w'}, summary: 'Summary 1'},
                {id: '2', title: 'Podcast 2', author: 'Author 2', image: {src: 'image2.jpg', srcSet: 'image2_small.jpg 55w, image2.jpg 170w'}, summary: 'Summary 2'},
            ];

            const result = transformToPodcasts(rawData);
            expect(result).toEqual(expectedPodcasts);
        });

        it('should return an empty array if rawData is null or has no entries', () => {
            expect(transformToPodcasts(null)).toEqual([]);
            expect(transformToPodcasts({feed: {entry: []}})).toEqual([]);
        });
    });

    describe('transformToPodcastDetails', () => {
        it('should transform raw podcast details correctly', () => {
            const rawItunesData = {
                resultCount: 3,
                results: [
                    {
                        wrapperType: 'track' as 'track',
                        artistName: 'Author 1',
                        collectionName: 'Podcast 1',
                        collectionExplicitness: 'notExplicit',
                        artworkUrl600: 'image1.jpg',
                        artworkUrl100: 'image1_100.jpg',
                        artworkUrl60: 'image1_60.jpg',
                        artworkUrl30: 'image1_30.jpg'
                    },
                    {
                        wrapperType: 'podcastEpisode' as 'podcastEpisode',
                        trackId: 101,
                        trackName: 'Episode 1',
                        releaseDate: '2024-01-01T12:00:00Z',
                        trackTimeMillis: 1800000,
                        description: 'Description 1',
                        episodeUrl: 'episode1.mp3',
                    },
                    {
                        wrapperType: 'podcastEpisode' as 'podcastEpisode',
                        trackId: 102,
                        trackName: 'Episode 2',
                        releaseDate: '2024-01-08T12:00:00Z',
                        trackTimeMillis: 2400000,
                        description: 'Description 2',
                        episodeUrl: 'episode2.mp3',
                    },
                ],
            };
            const podcastId = '1';

            const result = transformToPodcastDetails(rawItunesData, podcastId);

            expect(result).toEqual({
                podcastInfo: {
                    id: '1',
                    title: 'Podcast 1',
                    author: 'Author 1',
                    image: {src: 'image1.jpg', srcSet: 'image1_30.jpg 30w, image1_60.jpg 60w, image1_100.jpg 100w, image1.jpg 600w'},
                    summary: ''
                },
                podcastDetails: {
                    id: '1',
                    title: 'Podcast 1',
                    author: 'Author 1',
                    image: {src: 'image1.jpg', srcSet: 'image1_30.jpg 30w, image1_60.jpg 60w, image1_100.jpg 100w, image1.jpg 600w'},
                    summary: '',
                    episodes: [
                        {
                            id: 101,
                            title: 'Episode 1',
                            date: '01/01/2024',
                            duration: '30:00',
                            description: 'Description 1',
                            url: 'episode1.mp3',
                        },
                        {
                            id: 102,
                            title: 'Episode 2',
                            date: '08/01/2024',
                            duration: '40:00',
                            description: 'Description 2',
                            url: 'episode2.mp3',
                        }
                    ]
                }
            });
        });

        it('should return null if rawData is null or has no results', () => {
            expect(transformToPodcastDetails(null, '1')).toBeNull();
            expect(transformToPodcastDetails({resultCount: 0, results: []}, '1')).toBeNull();
        });
    });
});