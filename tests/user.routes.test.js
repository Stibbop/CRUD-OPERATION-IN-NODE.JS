const request = require("supertest");
const express = require("express");

// Mock UserController completely
jest.mock("../controllers/UserController", () => ({
  createUser: (req, res) => res.status(200).json({}),
  getUser: (req, res) => res.status(200).json({}),
  getAllUsers: (req, res) => res.status(200).json([]),
  updateUser: (req, res) => res.status(200).json({}),
  deleteUser: (req, res) => res.status(200).json({}),
  getMembersForUser: (req, res) => res.status(200).json([]), // <-- Added this
}));

const userRoutes = require("../routes/UserRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User Routes Tests", () => {
  test("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/users", async () => {
    const res = await request(app).post("/api/users").send({ name: "Test" });
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/users/:userId/members", async () => {
    const res = await request(app).get("/api/users/123/members");
    expect(res.statusCode).toBe(200);
  });
});
