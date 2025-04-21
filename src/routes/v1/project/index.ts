import { FastifyPluginAsync } from "fastify";
import projectPostSchema from "./projectPostSchema.js";
import Project from "../../../lib/Project.js";

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

  fastify.get('/', async function (req, res){});
  fastify.delete('/', async function (req, res){});
  fastify.put('/', async function(req, res){});
}

export default project;