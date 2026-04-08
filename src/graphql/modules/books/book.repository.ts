import "dotenv/config";
import { logger } from "src/logger";

const bookApi = "https://www.googleapis.com/books/v1";

export async function getBookByTitle(title: string) {
  try {
    const response = await fetch(`${bookApi}/volumes?q=intitle:${title}&key=${process.env.GOOGLE_API_KEY_BOOKS}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    logger.error("Error fetching book data:", error);
    throw new Error("Failed to fetch book data");
  }
}
