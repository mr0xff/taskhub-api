import fp from "fastify-plugin";
import auth, { FastifyAuthFunction } from '@fastify/auth';
import ClientAuthError, { HTTPClient, IpAddress } from "../lib/ClientAuthError.js";
import argon2 from 'argon2';
import { User } from "@prisma/client";

export default fp(async function(fastify){
  fastify.register(auth);

  const clientRateLimit = new ClientAuthError();

  fastify.decorate<FastifyAuthFunction>('authorization', async function(req, res, next){
    fastify.log.warn('authriztion checking');
    next();
  });

  fastify.decorate("argon2", argon2);
  fastify.decorate("clientRateLimit", ClientAuthError);
  fastify.decorate("clientRateLimitHttp", HTTPClient);
  fastify.decorate("clientRateLimitIpAddrr", IpAddress);

  fastify.decorate<FastifyAuthFunction>('authentication', async function (req, res, next){
    try{
      const userToken = req.headers[String(process.env.AUTH_HEADER)] as string;
      fastify.jwt.verify(userToken);
      fastify.user = fastify.jwt.decode(userToken) as User;
      next();
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

      clientRateLimit.add(
        new HTTPClient(new IpAddress(req.ip), 
        req.headers["user-agent"] as string
      ));
      
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
    argon2: typeof argon2;
    clientRateLimit: typeof ClientAuthError;
    clientRateLimitHttp: typeof HTTPClient;
    clientRateLimitIpAddrr: typeof IpAddress;
  }
}