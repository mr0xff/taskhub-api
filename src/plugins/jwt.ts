import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { User } from '@prisma/client';
export default fp(async (fastify)=>{
  fastify.register(jwt, { secret: "xmvEvwGXBhh26g==" });
  fastify.decorate('user');
});

declare module 'fastify' {
  export interface FastifyInstance {
    user: User;
  }
}

