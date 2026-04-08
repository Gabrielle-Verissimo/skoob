import { builder } from "../../builder";
import type { BookDetails } from "./book.model";

export const BookDetailsRef = builder.objectRef<BookDetails>("Book").implement({
  fields: t => ({
    cover: t.exposeString("cover"),
    smallCover: t.exposeString("smallCover"),
    title: t.exposeString("title"),
    subtitle: t.exposeString("subtitle", { nullable: true }),
    authors: t.exposeStringList("authors"),
    publishedDate: t.exposeString("publishedDate"),
    publisher: t.exposeString("publisher"),
    sinopse: t.exposeString("sinopse"),
    isbn: t.exposeString("isbn"),
    qntPages: t.exposeInt("qntPages"),
    genre: t.exposeStringList("genre"),
  }),
});
