"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

type FallbackProps = { onRetry?: () => void };

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: React.ReactElement<FallbackProps>;
}

interface State {
  hasError: boolean;
}

/**
 * A shared error boundary component to catch and handle errors in its children.
 * In development, it re-throws errors to be caught by the development overlay.
 * @param {ErrorBoundaryProps} props The component props.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if ("url" in error) {
      console.error(
        `Uncaught error during fetch for URL: ${error.url}`,
        error,
        errorInfo,
      );
    } else {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return React.cloneElement(this.props.fallback, {
        onRetry: this.handleReset,
      });
    }
    return this.props.children;
  }
}
