import { describe, expect, test, vi } from "vitest";
import { getBookByTitle } from "../book.repository";
import { getBookDetails } from "../book.service";

vi.mock("../book.repository", () => ({
  getBookByTitle: vi.fn(),
}));

describe("Book Details", () => {
  test("should return mapped book details when book exists", async () => {
    const mockedApiResponse = {
      items: [
        {
          volumeInfo: {
            imageLinks: {
              thumbnail: "https://example.com/cover.jpg",
              smallThumbnail: "https://example.com/small-cover.jpg",
            },
            title: "Expected Title",
            subtitle: "Expected Subtitle",
            authors: ["Author A", "Author B"],
            publisher: "Publisher Name",
            publishedDate: "2024-01-01",
            description: "A very interesting book",
            industryIdentifiers: [
              { type: "ISBN_10", identifier: "0123456789" },
              { type: "ISBN_13", identifier: "9780123456786" },
            ],
            readingModes: { text: true, image: false },
            pageCount: 321,
            printType: "BOOK",
            categories: ["Category 1", "Category 2"],
            maturityRating: "NOT_MATURE",
            allowAnonLogging: true,
            contentVersion: "1.0",
            panelizationSummary: { containsEpubBubbles: false, containsImageBubbles: false },
            language: "en",
            previewLink: "https://example.com/preview",
            infoLink: "https://example.com/info",
            canonicalVolumeLink: "https://example.com/canonical",
          },
        },
      ],
    };

    vi.mocked(getBookByTitle).mockResolvedValue(mockedApiResponse as any);

    const result = await getBookDetails("Expected Title");

    expect(result).toEqual({
      cover: "https://example.com/cover.jpg",
      smallCover: "https://example.com/small-cover.jpg",
      title: "Expected Title",
      subtitle: "Expected Subtitle",
      authors: ["Author A", "Author B"],
      publishedDate: "2024-01-01",
      publisher: "Publisher Name",
      sinopse: "A very interesting book",
      isbn: "9780123456786",
      qntPages: 321,
      genre: ["Category 1", "Category 2"],
    });
  });

  test("should throw when book is not found", async () => {
    vi.mocked(getBookByTitle).mockResolvedValue(null as any);

    await expect(getBookDetails("Some missing book")).rejects.toThrow("Book not found");
  });
});
