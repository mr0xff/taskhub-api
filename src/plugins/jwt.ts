import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify)=>{
  fastify.register(jwt, { secret: "1234" });

  fastify.decorate('userId', '');
});

declare module 'fastify' {
  export interface FastifyInstance {
    userId?: jwt.DecodePayloadType;
  }
}

