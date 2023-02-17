import { FastifyInstance } from 'fastify';
import { EdenClient } from "eden-sdk";

export async function registerEden (server: FastifyInstance) {

    const API_KEY = process.env.API_KEY;
    const API_SECRET = process.env.API_SECRET;

    let eden = new EdenClient(API_KEY, API_SECRET);

    eden.loginApi(
        "admin",
        "admin"
    )

    server.decorate('eden', eden);
}

declare module "fastify" {
    interface FastifyInstance {
      eden?: EdenClient;
    }
}