import { builder } from "../../builder";
import { BookDetailsRef } from "./book.objectRef";
import { getBookDetails } from "./book.service";

builder.queryFields(t => ({
  bookDetails: t.field({
    skipTypeScopes: true,
    type: BookDetailsRef,
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args) => getBookDetails(args.title),
  }),
}));
