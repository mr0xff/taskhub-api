import { FastifyPluginAsync } from "fastify";
import authPostSchema from "./authPostSchema.js";
import { Email, Password, User, UserType } from "../../../lib/dataTypes.js";

const auth:FastifyPluginAsync = async function (fastify, opts){
  fastify.post('/', authPostSchema, async function(req, res){
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
  });
}

export default auth;