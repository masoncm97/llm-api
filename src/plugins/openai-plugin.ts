import { FastifyInstance } from 'fastify';
import { Configuration, OpenAIApi } from 'openai'

export async function registerOpenAi (server: FastifyInstance) {

    try {

    const configuration = new Configuration({
        apiKey: server.config.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    server.decorate('openai', openai);
    server.log.info("Successfully registered OpenAi Plugin");
  } catch (err) {
    server.log.error('Plugin: OpenAi, error on register', err);
  }
}

declare module "fastify" {
    interface FastifyInstance {
      openai?: OpenAIApi;
    }
  }