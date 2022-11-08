import supertest from "supertest";
import app from "../src/app";
const request = supertest(app);

describe("POST /api/auth/register", () => {
  describe("given a email and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request.post("/api/auth/register").send({
        email: "teacher2@gmail.com",
        password: "test@123",
        firstName: "first",
        lastName: "last",
        role: "91ff11eb-8560-473b-a5ac-62ec58b752c1",
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("when the user and password is missing", () => {});
});
