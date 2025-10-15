import { apiClient } from "@/shared/lib/api-client";

global.fetch = jest.fn();

describe("apiClient", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should return data on a successful request", async () => {
    const mockData = { success: true };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiClient("https://test.com");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw a custom ApiError on a failed request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
      text: async () => "Error details",
    });

    await expect(apiClient("https://test.com")).rejects.toThrow(
      "API Error: 500 Server Error - Error details",
    );
  });

  it("should re-throw a network error", async () => {
    const networkError = new Error("Network failed");
    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(apiClient("https://test.com")).rejects.toThrow(
      "Network failed",
    );
  });
});
