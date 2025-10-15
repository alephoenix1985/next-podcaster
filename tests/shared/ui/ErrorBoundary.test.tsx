import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorBoundary } from "@/shared/ui/errors/ErrorBoundary";
import { ErrorFallback } from "@/shared/ui/errors/ErrorFallback";

const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary fallback={<ErrorFallback message="Error" />}>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("should render fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundary
        fallback={<ErrorFallback message="Something went wrong" />}
      >
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
