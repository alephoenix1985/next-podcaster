'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: React.ReactElement;
}

interface State {
    hasError: boolean;
}

/**
 * A shared error boundary component to catch and handle errors in its children.
 * In development, it re-throws errors to be caught by the development overlay.
 * @param {ErrorBoundaryProps} props The component props.
 * @returns {JSX.Element} The error boundary component.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (process.env.NODE_ENV === 'development') {
            throw error;
        }
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError && process.env.NODE_ENV !== 'development') {
            return this.props.fallback;
        }
        return this.props.children;
    }
}