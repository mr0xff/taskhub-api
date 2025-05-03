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
        currentPass,
        newPass,
        confirmPass
      } = req.body as PasswordIF;
      
      const currentPassFromDb = (await fastify.db.user.findUnique({ where: { id: fastify.user.id }}))?.password;
      
      if(!currentPassFromDb)
        throw new Error("conta invalida");

      if(!(await fastify.argon2.verify(currentPassFromDb, currentPass)))
        throw new Error("operação invalida");

      const data = {
        newPass: new Password(newPass).password,
        confirmPass: new Password(confirmPass).password
      }

      if (data.newPass !== data.confirmPass)
        throw new Error("as senhas são diferentes!");

      const pass = await fastify.argon2.hash(newPass);
      await fastify.db.user.update({ where: { id: fastify.user.id }, data: { password: pass }})
      
      res.send({
        message: "senha actualizada!",
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