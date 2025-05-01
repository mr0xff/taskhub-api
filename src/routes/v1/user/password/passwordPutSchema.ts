import { FastifySchema } from "fastify";

const passwordPutSchema:FastifySchema = {
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
      currentPass: { type: "string" },
      newPass: { type: "string" },
      confirmPass: { type: "string" }
    },
    required: [ "currentPass", "newPass", "confirmPass" ]
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        status: { type: "boolean" },
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
  schema: passwordPutSchema
}