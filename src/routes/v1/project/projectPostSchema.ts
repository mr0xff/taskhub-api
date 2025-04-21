import { FastifySchema } from "fastify";

const projectPostSchema:FastifySchema = {
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      summary: { type: "string" },
    },
    
    required: [ "title" ]
  }
};

export default {
  schema: projectPostSchema
}