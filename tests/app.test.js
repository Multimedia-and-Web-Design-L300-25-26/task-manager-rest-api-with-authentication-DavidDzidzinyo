import request from "supertest";
import app from "../src/app.js";

describe("Task Manager API", () => {
  test("GET / should return API status", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("POST /api/auth/register should validate required fields", async () => {
    const res = await request(app).post("/api/auth/register").send({ email: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
  });

  test("POST /api/auth/login should validate required fields", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
  });

  test("GET /api/tasks should require authentication", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/not authorized/i);
  });
});
