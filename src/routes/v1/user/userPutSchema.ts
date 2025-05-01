import { FastifySchema } from "fastify";

const userPutSchema:FastifySchema = {
  headers: {
    type: "object",
    properties: {
      [String(process.env.AUTH_HEADER)]: { type: "string" },
      [String(process.env.AUTHORIZATION_HEADER)]: { type: "string" }
    },
    required: [String(process.env.AUTH_HEADER)]
  },
  body: {
    type: "object",
    properties: {
      email: { type: "string" }
    },
    required: ["email"]
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
  schema: userPutSchema
}