import { FastifyPluginAsync } from "fastify";
import passwordPutSchema from "./passwordPutSchema.js";
import { Password } from "../../../../lib/dataTypes.js";

type PasswordIF = {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

const password: FastifyPluginAsync = async function (fastify, opts){
  fastify.addHook('preHandler', fastify.auth([fastify.authentication]));

  fastify.put('/', passwordPutSchema, async function(req, res){
    try{
      const {
        newPass,
        confirmPass
      } = req.body as PasswordIF;
      
      const data = {
        newPass: new Password(newPass).password,
        confirmPass: new Password(confirmPass).password
      }

      if (data.newPass !== data.confirmPass)
        throw new Error("as senhas são diferentes!");

      res.send({
        message: "senha actualizada com sucesso!",
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

export default password;