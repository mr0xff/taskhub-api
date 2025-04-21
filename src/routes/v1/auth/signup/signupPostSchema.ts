import { FastifySchema } from "fastify";

const signupPostSchema:FastifySchema = {
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      confirmPassword: { type: "string" },
    },
    required: [ "username", "email", "password", "confirmPassword" ]
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        status: { type: "boolean" }
      }
    },
    401: {
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
  schema: signupPostSchema
};