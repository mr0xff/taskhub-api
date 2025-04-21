import { FastifySchema } from "fastify";

const userGetSchema:FastifySchema = {
  headers: {
    type: "object",
    properties: {
      "x-auth-key": { type: "string" },
      "x-authorization-key": { type: "string" }
    },
    required: ["x-auth-key"]
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" }
      }
    },
    403: {
      type: "object",
      properties: {
        message: { type: "string" },
        status: { type: "boolean" },
        type: { type: "string" }
      }
    }
  }
}

export default {
  schema: userGetSchema
}