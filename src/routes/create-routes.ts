import { Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyPluginAsync } from 'fastify';

export const createRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {

  server.post('/create', {
    schema: {
      request: {
        body: Type.Object({
          prompt: Type.String(),
        }),
      },
      response: {
        200: Type.Object({
          response: Type.Any()
        }),
      },
    },
    handler: (req, reply) => handleRequestCreate(server, req, reply)
  })
}


interface EdenRequest extends FastifyRequest {
  body: {
    prompt: string
  }
}

async function handleRequestCreate(server: FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
  
  try {

    if(!server.eden) {
      server.log.error('Invalid Eden configuration');
      return;
    }

    const { prompt } = req.body as EdenRequest["body"];

    
      let edenResp = await server.eden.create("create", {
        "text_input": prompt
      });

    return { response: edenResp }

  } catch (err) {
    server.log.error('Plugin: Eden, error on register', err);
  }
}
