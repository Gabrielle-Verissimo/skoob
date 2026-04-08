import type { BookGoogleApi } from "./book.dto";
import type { BookDetails } from "./book.model";

export function mapBookGoogleToBookDetails(book: BookGoogleApi): BookDetails {
  return {
    cover: book.imageLinks.thumbnail,
    smallCover: book.imageLinks.smallThumbnail,
    title: book.title,
    subtitle: book.subtitle || "",
    authors: book.authors,
    publishedDate: book.publishedDate,
    publisher: book.publisher,
    sinopse: book.description,
    isbn: book.industryIdentifiers.find((id: any) => id.type === "ISBN_13")!.identifier,
    qntPages: book.pageCount,
    genre: book.categories,
  };
}
