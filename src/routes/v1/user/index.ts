import { FastifyPluginAsync } from "fastify";
import userGetSchema from "./userGetSchema.js";

const user:FastifyPluginAsync = async function (fastify){
  fastify.addHook('preHandler', fastify.auth([fastify.authentication]));
  
  fastify.get('/', userGetSchema, async function(req, res){

    try{
      res.send({
        id: "",
        username: "",
        email: ""
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