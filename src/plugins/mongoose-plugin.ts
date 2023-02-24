import type { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

export const registerMongo = async (server: FastifyInstance, mongoUri: string | undefined) => {
    const url = mongoUri || server.config.MONGO_URI
    try {
      await server.register(import('@fastify/mongodb'), {
        forceClose: true,
        url
      });
      mongoose.set('strictQuery', true);
      mongoose.connect(process.env.MONGO_URI as string);
      server.log.info('Successfully registered MongoPlugin');
    } catch (err) {
      server.log.error('Plugin: Mongo, error on register', err);
    }
};

export default registerMongo