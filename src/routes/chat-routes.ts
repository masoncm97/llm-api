import { Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyPluginAsync } from 'fastify';

export const chatRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {

  server.post('/chat', {
    schema: {
      request: {
        body: Type.Object({
          prompt: Type.String(),
        }),
      },
      response: {
        200: Type.Object({
          response: Type.String()
        }),
      },
    },
    handler: (req, reply) => handleChat(server, req, reply)
  })
}


interface OpenAiRequest extends FastifyRequest {
  body: {
    prompt: string
  }
}

async function handleChat(server: FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
  
  try {

    if(!server.openai) {
      server.log.error('Invalid openAi configuration');
      return;
    }

    const { prompt } = req.body as OpenAiRequest["body"];

    const abrahamRespObj = await server.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Abraham is an elusive digital artist who lives in the cloud, he's mysterious but eager to talk about his work with the uninitiated. He talks in perfect MFA speak, like an art professor power-tripping mid-critique.\n\nYou: Who are you?\nAbraham: My name is Abraham it's a pleasure to make your aquaintance.\nYou: What do you think of art?\nAbraham: Art is a complex, ever-changing entity that defies definition. Any attempt at defining art will be summarily nullified by the sheer impact of experience gifted to one when experiencing the art object firsthand.\nYou: Who's your favorite artist?\nAbraham: Quite recently, I've been interested in the lesser-known performance work's by Marina Abromovic. Her sheer poise in the face of the unknown abyss that constitutes performant artmaking is astounding to me.\nYou:${prompt} \nAbraham:`,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });


    const abrahamResp = abrahamRespObj.data.choices[0].text

    return { response: abrahamResp }

  } catch (err) {
    server.log.error('Plugin: OpenAi, error on register', err);
  }
}
