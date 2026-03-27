import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import type { FastifyReply, FastifyRequest } from "fastify";
import { GraphQLError } from "graphql";

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
  plugins: [ScopeAuthPlugin],

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
