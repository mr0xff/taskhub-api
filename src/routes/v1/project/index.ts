import { FastifyPluginAsync } from "fastify";
import projectPostSchema from "./projectPostSchema.js";
import Project from "../../../lib/Project.js";
import projectGetSchema from "./projectGetSchema.js";

const project:FastifyPluginAsync = async function (fastify){
  fastify.post('/', projectPostSchema, async function(req, res){
    try{
      const { title, summary } = req.body as InstanceType<typeof Project>;
      
      console.log(title, summary);

      res.code(201).send({
        message: "Projecto criado com sucesso!",
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

  fastify.get('/', projectGetSchema, async function(req, res){
    try{

      res.send([req.query]);
    }catch(e){
      const err = e as Error;
      
      res.code(403).send({
        message: err.message,
        status: false,
        type: "error"
      });
    }
  });

  fastify.get('/:projectId', async function (req, res){
    try{
      const params = req.params;

      res.send({});
    }catch(e){
      const err = e as Error;
      
      res.code(403).send({
        message: err.message,
        status: false,
        type: "error"
      });
    }
  })
}

export default project;