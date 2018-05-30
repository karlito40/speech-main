import bootstrap from "../src/bootstrap";

const server = { app: null };
beforeAll(async () => {
  return server.app = await bootstrap();
});

export default server;
