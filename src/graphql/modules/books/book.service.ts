import { logger } from "../../../logger";
import { bookGoogleApiSchema } from "./book.dto";
import { mapBookGoogleToBookDetails } from "./book.mapper";
import type { BookDetails } from "./book.model";
import { getBookByTitle } from "./book.repository";

export async function getBookDetails(title: string): Promise<BookDetails> {
  const book = await getBookByTitle(title);

  if (!book) {
    throw new Error("Book not found");
  }

  const validateBook = bookGoogleApiSchema.safeParse(book.items[0].volumeInfo);
  if (!validateBook.success) {
    logger.error("Invalid book data from Google API");
  }

  return mapBookGoogleToBookDetails(book.items[0].volumeInfo);
}
