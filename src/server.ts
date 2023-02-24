import Fastify from 'fastify'
import { chatRoutes } from './routes/chat-routes'
import { createRoutes } from './routes/create-routes'
import { registerOpenAi } from './plugins/openai-plugin'
import { registerEden } from './plugins/eden-plugin'
import config from './plugins/config';
import * as dotenv from 'dotenv'

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */

const createServer = async () => {
  const server = Fastify({
    logger: true
  })

  await server.register(config);
  registerOpenAi(server)
  registerEden(server)
  
  server.register(chatRoutes)
  server.register(createRoutes)

  
  return server
}

export default createServer
