import { FastifyInstance } from "fastify";
import { EdenClient } from "eden-sdk";

export async function registerEden(server: FastifyInstance) {

  try {
    let eden = new EdenClient();

    eden.loginApi("admin", "admin");

    server.decorate("eden", eden);
    server.log.info("Successfully registered Eden Plugin");
  } catch (err) {
    server.log.error("Plugin: Eden, error on register", err);
  }
}

declare module "fastify" {
  interface FastifyInstance {
    eden?: EdenClient;
  }
}
