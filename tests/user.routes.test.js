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

//Test suite for User routes
describe("User Routes Tests", () => {
  //Test Get all users route
  test("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
  });
  //Test for create user
  test("POST /api/users", async () => {
    const res = await request(app).post("/api/users").send({ name: "Test" });
    expect(res.statusCode).toBe(200);
  });
  //Test for get user by ID
  test("GET /api/users/:userId/members", async () => {
    const res = await request(app).get("/api/users/123/members");
    expect(res.statusCode).toBe(200);
  });
  //Test for update user  
 test("PATCH /api/users/:id should return 200", async () => {
    const res = await request(app)
      .patch("/api/users/123")
      .send({ firstName: "Updated" });
    expect(res.statusCode).toBe(200);
});
  //Test for delete user
  test("DELETE /api/users/:id should return 200", async () => {
    const res = await request(app).delete("/api/users/123");
    expect(res.statusCode).toBe(200);
});

});
