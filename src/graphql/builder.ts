import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ZodPlugin from "@pothos/plugin-zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { GraphQLError } from "graphql";
import { type ZodError, z } from "zod";

export interface MyContext {
  req: FastifyRequest;
  reply: FastifyReply;
  user?: { id: string; email: string } | undefined;
}

export const builder = new SchemaBuilder<{
  Context: MyContext;
  AuthScopes: {
    loggedIn: boolean;
  };
}>({
  plugins: [ScopeAuthPlugin, ZodPlugin],
  zod: {
    validationError: (zodError: ZodError, _args, _context, _info) => {
      const errorMessage = zodError.issues[0]?.message;

      return new GraphQLError(errorMessage as string, {
        extensions: {
          //code: "BAD_USER_INPUT",
          zodErrors: z.treeifyError(zodError),
        },
      });
    },
  },
  scopeAuth: {
    authScopes: async context => ({
      loggedIn: !!context.user,
    }),
    unauthorizedError: (_parent, _context, info) => {
      return new GraphQLError(`Acesso negado: Você precisa estar logado para acessar "${info.fieldName}".`, {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    },
  },
});
