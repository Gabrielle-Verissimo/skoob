import { builder } from "./builder";

builder.queryType({
  authScopes: {
    loggedIn: true,
  },
});
builder.mutationType({
  authScopes: {
    loggedIn: true,
  },
});

import "./modules/books/book.schema";
import "./modules/user/user.schema";

export const schema = builder.toSchema();
