import { GraphQLError } from "graphql";

export enum UserErrorCode {
  BAD_USER_INPUT = "BAD_USER_INPUT",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export function UserError(message: string, code: UserErrorCode, details?: string) {
  return new GraphQLError(message, {
    extensions: {
      code: code,
      details: details,
    },
  });
}
