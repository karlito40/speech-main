import request from "supertest";
import server from "../bootstrap";

describe("GET /api", () => {
  it("should return 200", () => {
    return request(server.app)
      .get("/api")
      .expect(200);
  });
});