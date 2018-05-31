import request from "supertest";
import bootstrap from "../../src/bootstrap";

let app;
beforeAll(async () => {
  return app = await bootstrap();
});


describe("GET /api", () => {
  it("should return 200", () => {
    return request(app)
      .get("/api")
      .expect(200);
  });
});