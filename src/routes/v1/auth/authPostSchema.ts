import { FastifySchema } from "fastify";

const authPostSchema:FastifySchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      secret: { type: "string" }
    },
    required: [ "email", "secret" ]
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        status: { type: "boolean" }
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

export default { schema: authPostSchema };