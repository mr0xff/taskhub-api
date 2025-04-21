import { FastifyPluginAsync } from "fastify";

const project:FastifyPluginAsync = async function (fastify){
  fastify.post('/', async function(req, res){

  });

  fastify.get('/', async function (req, res){});
  fastify.delete('/', async function (req, res){});
  fastify.put('/', async function(req, res){});
}