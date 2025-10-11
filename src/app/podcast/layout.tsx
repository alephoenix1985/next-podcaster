import React, {JSX} from 'react';

/**
 * A simple layout wrapper for podcast-related pages.
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child elements to render.
 * @returns {JSX.Element} The layout component.
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}