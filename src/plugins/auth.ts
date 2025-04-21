import fp from "fastify-plugin";
import auth, { FastifyAuthFunction } from '@fastify/auth';

export default fp(async function(fastify){
  fastify.register(auth);

  fastify.decorate<FastifyAuthFunction>('authorization', async function(req, res, next){
    fastify.log.warn('authriztion checking');
    next();
  });

  fastify.decorate<FastifyAuthFunction>('authentication', async function (req, res, next){
    fastify.log.warn(req.headers['x-auth-key']);
    fastify.userId = fastify.jwt.decode(req.headers['x-auth-key'] as string) ?? undefined;
    console.log(fastify.userId);
  });

});

declare module 'fastify' {
  export interface FastifyInstance {
    authorization(): FastifyAuthFunction;
    authentication(): FastifyAuthFunction;
  }
}