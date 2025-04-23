import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify)=>{
  fastify.register(jwt, { secret: "xmvEvwGXBhh26g==" });
  fastify.decorate('userId');
});

declare module 'fastify' {
  export interface FastifyInstance {
    userId?: jwt.DecodePayloadType;
  }
}

