import Fastify from "fastify";
import { createSchema, createYoga } from "graphql-yoga";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Olá do Fastify + Yoga!",
    },
  },
});

const yoga = createYoga({ schema });

const app = Fastify();

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
