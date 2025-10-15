import { getPodcasts } from "@/shared/api/itunes-api";
import { apiClient } from "@/shared/lib/api-client";

jest.mock("@/shared/lib/api-client");

const mockedApiClient = apiClient as jest.Mock;

describe("iTunes API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPodcasts", () => {
    it("should fetch and transform podcasts correctly", async () => {
      mockedApiClient.mockResolvedValue({
        feed: {
          entry: [
            {
              "im:name": { label: "Test Podcast" },
              "im:image": [{}, {}, { label: "image.jpg" }],
              "im:artist": { label: "Test Author" },
              id: { attributes: { "im:id": "123" } },
              summary: { label: "Test Summary" },
            },
          ],
        },
      });

      const podcasts = await getPodcasts();

      expect(podcasts).toHaveLength(1);
      expect(podcasts[0]).toEqual({
        id: "123",
        title: "Test Podcast",
        author: "Test Author",
        image: "image.jpg",
        summary: "Test Summary",
      });
    });

    it("should return an empty array if API response is malformed", async () => {
      mockedApiClient.mockResolvedValue({ feed: {} });
      const podcasts = await getPodcasts();
      expect(podcasts).toEqual([]);
    });
  });
});
