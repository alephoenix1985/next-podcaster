import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterPodcasts } from "@/features/filter-podcasts/ui/FilterPodcasts";

describe("FilterPodcasts", () => {
  it("renders correctly with initial props", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPodcasts
        count={100}
        filter=""
        onFilterChange={mockOnFilterChange}
      />,
    );

    expect(screen.getByText("100")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Filter podcasts...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("calls onFilterChange when user types in the input", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPodcasts
        count={100}
        filter=""
        onFilterChange={mockOnFilterChange}
      />,
    );

    const input = screen.getByPlaceholderText("Filter podcasts...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("test");
  });

  it("displays the correct filter value in the input", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPodcasts
        count={100}
        filter="initial filter"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const input = screen.getByPlaceholderText("Filter podcasts...");
    expect(input).toHaveValue("initial filter");
  });
});
