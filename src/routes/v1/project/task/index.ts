import { FastifyPluginAsync } from "fastify";

const task:FastifyPluginAsync = async function(fastify){
  fastify.post('/', async function (req, res){
    try{

      res.code(201).send({
        message: "Tarefa definida com sucesso!",
        status: true,
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

  fastify.get('/', async function (req, res){
    try{

      res.code(201).send([]);
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

export default task;