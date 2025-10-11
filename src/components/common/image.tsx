'use client';

import React, {cloneElement, ImgHTMLAttributes, JSX, Suspense, use} from 'react';

const imagePromiseCache = new Map<string, Promise<void>>();

/**
 * Props for the ImageWithSkeleton component.
 * It extends standard image attributes and adds a class for the skeleton.
 */
interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
    skeleton: JSX.Element;
    imageClassName?: string;
    skeletonClassName?: string;
}

function preloadImage(src: string | Blob): Promise<void> {
    const srcKey = src instanceof Blob ? URL.createObjectURL(src) : src;

    if (!imagePromiseCache.has(srcKey)) {
        let promise;
        if (typeof window === 'undefined') {
            promise = Promise.resolve();
        } else {
            promise = new Promise<void>(resolve => {
                const img = new window.Image();
                img.onload = () => resolve(undefined);
                img.onerror = () => resolve(undefined);
                img.src = srcKey;
            });
        }
        imagePromiseCache.set(srcKey, promise);
    }
    return imagePromiseCache.get(srcKey)!;
}

/**
 * An internal component that loads an image and suspends while loading.
 * @param {ImgHTMLAttributes<HTMLImageElement>} props The image attributes.
 * @returns {JSX.Element} The img element.
 */
function Img(props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    if (props.src) {
        use(preloadImage(props.src));
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ''}/>;
}

/**
 * A component that displays a skeleton loader while an image is loading, using Suspense.
 * @param skeleton
 * @param imageClassName
 * @param className
 * @param skeletonClassName
 * @param {ImageWithSkeletonProps} props The component props.
 * @returns {JSX.Element} The image component with a skeleton loader.
 */
export default function Image({skeleton, imageClassName, className, skeletonClassName, ...props}: ImageWithSkeletonProps): JSX.Element {
    const imageCombinedClassName = [className, imageClassName].filter(Boolean).join(' ');
    const skeletonWithClass = cloneElement(skeleton, {
        className: [skeleton.props.className, skeletonClassName].filter(Boolean).join(' ')
    });
    return (
        <Suspense fallback={skeletonWithClass}>
            <Img {...props} className={imageCombinedClassName} />
        </Suspense>
    );
}