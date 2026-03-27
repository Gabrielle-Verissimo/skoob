import { builder } from "../../builder";
import type { Login } from "./user.model";

export const LoginRef = builder.objectRef<Login>("Login").implement({
  fields: t => ({
    token: t.exposeString("token"),
  }),
});
