import request from "supertest";
import bootstrap from "../../src/bootstrap";

let app;
beforeAll(async () => {
  return app = await bootstrap();
});


describe("GET /", () => {
  it("should return 200", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});