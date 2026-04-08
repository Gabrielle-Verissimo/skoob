import { builder } from "../../builder";

export const LoginInput = builder.inputType("LoginInput", {
  fields: t => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

export const RegisterInput = builder.inputType("RegisterInput", {
  fields: t => ({
    name: t.string({ required: true }),
    userName: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});
