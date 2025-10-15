"use client";

import React, { useState, JSX } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useLoading } from "@/shared/lib/hooks/loading.hook";

interface ImageProps extends NextImageProps {
  skeletonClassName?: string;
}

/**
 * It displays a skeleton loader while the image is loading and updates a global loading state.
 * @param skeletonClassName
 * @param {ImageProps} props The properties for the component.
 * @returns {JSX.Element} The Image component with loading state handling.
 */
export function Image({
  skeletonClassName,
  ...props
}: ImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [, setLoadingState] = useLoading();
  const imageId = typeof props.src === "string" ? props.src : "image-static";

  const handleLoadStart = () => {
    setIsLoading(true);
    setLoadingState(`image-${imageId}`, true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setLoadingState(`image-${imageId}`, false);
  };

  return (
    <div className={props.className}>
      <div
        className="relative"
        style={{ width: props.width, height: props.height }}
      >
        {isLoading && (
          <div
            className={`absolute top-0 left-0 w-full h-full inset-0 animate-pulse bg-gray-300 ${skeletonClassName || ""}`}
          />
        )}
        <NextImage
          {...props}
          onLoadStart={handleLoadStart}
          onLoad={handleLoadingComplete}
          className={`absolute inset-0 w-full h-full ${isLoading ? "opacity-0" : "opacity-100"}`}
          style={{ transition: "opacity 0.3s ease-in-out" }}
        />
      </div>
    </div>
  );
}
