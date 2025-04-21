import { FastifySchema } from "fastify";

const projectGetSchema:FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      title: { type: "string" },
      doned: { type: "boolean" } 
    }
  },
  response:{
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          allowedUsers: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    }
  }
};

export default {
  schema: projectGetSchema
}