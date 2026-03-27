import { builder } from "../../builder";
import { LoginInput } from "./user.input";
import { LoginRef } from "./user.objectRef";
import { login } from "./user.service";

builder.queryFields(t => ({
  hello: t.string({
    resolve: () => "Hello, world!",
  }),
}));

builder.mutationFields(t => ({
  login: t.field({
    skipTypeScopes: true,
    type: LoginRef,
    args: {
      input: t.arg({ type: LoginInput, required: true }),
    },
    resolve: async (_parent, args) => login(args.input),
  }),
}));
