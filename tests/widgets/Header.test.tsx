import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/widgets/header/ui/Header";
import { LoadingProvider } from "@/shared/ui/providers/loading/LoadingProvider";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Header", () => {
  it("renders the header with the title and link to home", () => {
    render(
      <LoadingProvider>
        <Header />
      </LoadingProvider>,
    );

    const linkElement = screen.getByRole("link", { name: /podcaster/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
