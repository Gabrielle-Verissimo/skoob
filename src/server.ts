import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import type { MyContext } from "./graphql/builder";
import type { User } from "./graphql/modules/user/user.model";
import { schema } from "./graphql/schema";
import { verifyToken } from "./utils/jwt";

const app = Fastify();

const yoga = createYoga<{ req: FastifyRequest; reply: FastifyReply }, MyContext>({
  schema: schema,
  context: async ({ req, reply }) => {
    const authHeader = req.headers.authorization;
    let user: User | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      if (token) {
        user = verifyToken(token) as User;
      }
    }

    if (user) {
      return { req, reply, user };
    }

    return {
      req,
      reply,
    };
  },
});

app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequest(req, { req, reply });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });
    reply.status(response.status);
    reply.send(response.body);
    return reply;
  },
});

app.listen({ port: 4000 }, () => {
  console.log("Servidor rodando em http://localhost:4000/graphql");
});
