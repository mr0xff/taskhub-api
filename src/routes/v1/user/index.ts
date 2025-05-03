import { FastifyPluginAsync } from "fastify";
import userGetSchema from "./userGetSchema.js";
import userPutSchema from "./userPutSchema.js";
import { Email } from "../../../lib/dataTypes.js";

const user:FastifyPluginAsync = async function (fastify){
  fastify.addHook('preHandler', fastify.auth([fastify.authentication]));
  
  fastify.get('/', userGetSchema, async function(req, res){
    try{
      const user = await fastify.db.user.findUnique({ where: { id: fastify.user?.id }})

      res.send({
        id: user?.id,
        username: user?.username,
        email: user?.email
      });
    }catch(e){
      const err = e as Error;

      res.code(403).send({
        message: err.message,
        status: false,
        type: "error"
      });
    }
  }); 

  fastify.put('/', userPutSchema, async function(req, res){
    try{
      const body = req.body as { email: string };
      const email = new Email(body.email);
      
      await fastify.db.user.update({
        where: { id: fastify.user.id },
        data: {
          email: email.email
        }
      });

      res.send({
        message: "informações actualizadas com sucesso!",
        email: email.email,
        status: true
      });
    }catch(e){
      const err = e as Error;

      res.code(403).send({
        message: err.message,
        status: false,
        type: "error"
      });
    }
  });
}

export default user;