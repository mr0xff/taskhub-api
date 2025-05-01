import { FastifyPluginAsync } from "fastify";
import signupPostSchema from "./signupPostSchema.js";
import { Email, Password, User, type SignupUser } from "../../../../lib/dataTypes.js";

const signup:FastifyPluginAsync = async function(fastify){
  fastify.post('/', signupPostSchema, async function(req, res){
    try{
      const { 
        email,
        password,
        confirmPassword,
        username 
      } = req.body as SignupUser;
      
      const confirmPass = new Password(confirmPassword);

      const user = new User({
        email: new Email(email),
        secret: new Password(password)
      });
      
      if (!username.trim())
        throw new Error("sem nome de usuário!");
      
      if (user.secret !== confirmPass.password)
        throw new Error("senhas diferentes!");
  
      await fastify.db.user.create({
        data: {
          username,
          email,
          password
        }
      });
      
      res.code(201).send({
        message: "sua conta foi criada com sucesso!",
        status: true
      });
    }catch(e){
      const err  = e as Error;

      return res.code(401).send({
        message: err.message,
        status: false,
        type: "warn"
      });
    }
  });
}

export default signup;