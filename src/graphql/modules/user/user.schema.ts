import { builder } from "../../builder";
import { registerInputSchema } from "./user.dto";
import { LoginInput, RegisterInput } from "./user.input";
import { LoginRef, RegisterUserRef } from "./user.objectRef";
import { login, register } from "./user.service";

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

  register: t.field({
    skipTypeScopes: true,
    type: RegisterUserRef,
    args: {
      input: t.arg({ type: RegisterInput, required: true, validate: { schema: registerInputSchema } }),
    },
    resolve: async (_parent, args) => register(args.input),
  }),
}));
