import {ImageResponse} from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
        >
            <defs>
                <linearGradient id="podcastGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#2b5893', stopOpacity: 1}}/>
                    <stop offset="100%" style={{stopColor: '#4a90e2', stopOpacity: 1}}/>
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="12" fill="url(#podcastGradient)"/>
            <path
                d="M 8 13 A 4 4 0 0 1 16 13"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 5 10 A 7 7 0 0 1 19 10"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="white"/>
        </svg>)
        ,
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        })
}