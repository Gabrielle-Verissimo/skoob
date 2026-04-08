export interface BookDetails {
  cover: string;
  smallCover: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  sinopse: string;
  isbn: string;
  qntPages: number;
  genre: string[];
}
