const UserController = require("../controllers/UserController"); //Import UserController
const User = require("../models/User");//Import User model

jest.mock("../models/User"); //Mock user model

//Mock response object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};
//Test suite for UserController
describe("User Controller Tests", () => {
  //Test case for createUser
  test("createUser should create user", async () => {
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true),
    }));

    const req = { body: { name: "Test User" } };
    const res = mockRes();

    await UserController.createUser(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  test("getAllUsers should return users", async () => {
    User.find = jest.fn().mockResolvedValue([]);

    const req = {};
    const res = mockRes();

    await UserController.getAllUsers(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  test("deleteUser should return success message", async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const req = { params: { id: "123" } };
    const res = mockRes();

    await UserController.deleteUser(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
