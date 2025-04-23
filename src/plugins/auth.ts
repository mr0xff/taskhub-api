import fp from "fastify-plugin";
import auth, { FastifyAuthFunction } from '@fastify/auth';
import ClientAuthError from "../lib/ClientAuthError.js";

export default fp(async function(fastify){
  fastify.register(auth);
  const cAuthError = new ClientAuthError();

  fastify.decorate<FastifyAuthFunction>('authorization', async function(req, res, next){
    fastify.log.warn('authriztion checking');
    next();
  });

  fastify.decorate<FastifyAuthFunction>('authentication', async function (req, res, next){
    try{
      const userToken = req.headers['x-auth-key'] as string;
      fastify.jwt.verify(userToken);
      fastify.userId = fastify.jwt.decode(userToken) as string;
      fastify.log.warn(fastify.userId);
    }catch(e){
      const err = e as Error & { code: string };
      
      type CustomMsgError = {
        [key:string]: string;
      }

      const customMsgError:CustomMsgError = {
        "FAST_JWT_EXPIRED": "token expirado",
        "FAST_JWT_INVALID_SIGNATURE": "assinatura do token invalida",
        "ERR_ASSERTION": "sem token definido",
        "FAST_JWT_MALFORMED": "token mal formatado"
      };

      console.log(cAuthError);

      fastify.log.error(req.ip);
      
      return res.code(401).send({
        message: customMsgError[err.code],
        message_en: err.message,
        status: false,
        type: "error"
      });
    }
  });

});

declare module 'fastify' {
  export interface FastifyInstance {
    authorization(): FastifyAuthFunction;
    authentication(): FastifyAuthFunction;
  }
}