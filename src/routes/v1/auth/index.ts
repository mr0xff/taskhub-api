import { FastifyPluginAsync } from "fastify";
import authPostSchema from "./authPostSchema.js";
import { Email, Password, User, UserType } from "../../../lib/dataTypes.js";

const auth:FastifyPluginAsync = async function (fastify){
  fastify.post('/', authPostSchema, async function(req, res){
    try{
      const { email, secret } = req.body as UserType;

      const user = new User({ 
        email: new Email(email), 
        secret: new Password(secret) 
      });
      
      console.log(user.toJSON());

      res.code(200).send({
        message: "login feito com sucesso",
        status: true
      });
    }catch(e){
      const err = e as Error; 

      res.code(401).send({
        message: err.message,
        status: false,
        type: "warn"
      });
    }
  });
}

export default auth;