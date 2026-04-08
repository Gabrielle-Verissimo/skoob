import { builder } from "../../builder";
import type { Login, UserResponse } from "./user.model";

export const LoginRef = builder.objectRef<Login>("Login").implement({
  fields: t => ({
    token: t.exposeString("token"),
  }),
});

export const RegisterUserRef = builder.objectRef<UserResponse>("RegisterUser").implement({
  fields: t => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    userName: t.exposeString("userName"),
    email: t.exposeString("email"),
  }),
});
