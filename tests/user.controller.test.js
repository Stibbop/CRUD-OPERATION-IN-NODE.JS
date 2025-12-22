const UserController = require("../controllers/UserController"); //Import UserController
const User = require("../models/User");//Import User model
const Member = require("../models/Member");//Import Member model

jest.mock("../models/User"); //Mock user model
jest.mock("../models/Member"); //Mock member model

//Mock response object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};
//Test suite for UserController
describe("User Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test case for createUser
  test("createUser should create user", async () => {
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true),
    }));

    const req = { body: { name: "Test User" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.createUser(req, res);
    expect(res.json).toHaveBeenCalled(); //Check if res.json was called
  });
  //Test case for createUser database error handling
  test("createUser should handle errors", async () => {
    User.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    const req = { body: { name: "Test User" } }; //Mock request object
    const res = mockRes();  //Mock response object

    await UserController.createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
  //Test case for getAllUsers
  test("getAllUsers should return users", async () => {
    User.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([{ firstName: "John" }]), 
    });

    const req = {}; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getAllUsers(req, res);
    expect(res.json).toHaveBeenCalled(); //Check if res.json was called
  });
  //Test case for getAllUsers database error handling
  test("getAllUsers should handle errors", async () => {
    User.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("Database error")),
    });
 
    const req = {}; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
  //Test case for getUser
  test("getUser should return a user", async () => {
    User.findById = jest.fn().mockResolvedValue({ firstName: "John" });

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ firstName: "John" }); //Check if res.json was called with user data
  });
  //Test case for getUser not found
  test("getUser should return 404 if user not found", async () => {
    User.findById = jest.fn().mockResolvedValue(null);

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" }); //Check if res.json was called with not found message
  });
  //Test case for getUser database error handling
  test("getUser should handle errors", async () => {
    User.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
  //Test case for updateUser
  test("updateUser should update user with civil_Status and middleName", async () => {
    User.findByIdAndUpdate = jest.fn().mockResolvedValue({ middleName: "Updated", civil_Status: "Single" });
    //Mock request object
    const req = { 
      params: { id: "123" },
      body: { middleName: "Updated", civil_Status: "Single" }
    };
    const res = mockRes(); //Mock response object

    await UserController.updateUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ middleName: "Updated", civil_Status: "Single" }); //Check if res.json was called with updated user data
  });
  //Test case for updateUser not found
  test("updateUser should return 404 if user not found", async () => {
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    //Mock request object
    const req = { 
      params: { id: "123" },
      body: { middleName: "Updated" }
    };
    const res = mockRes(); //Mock response object

    await UserController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" }); //Check if res.json was called with not found message
  });
  //Test case for updateUser database error handling
  test("updateUser should handle errors", async () => {
    User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error("Database error"));
    //Mock request object
    const req = { 
      params: { id: "123" },
      body: { middleName: "Updated" }
    };
    const res = mockRes(); //Mock response object

    await UserController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
  //Test case for deleteUser
  test("deleteUser should return success message", async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.deleteUser(req, res);
    expect(res.json).toHaveBeenCalled(); //Check if res.json was called
  });
  //Test case for deleteUser not found
  test("deleteUser should return 404 if user not found", async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });  //Check if res.json was called with not found message
  });
  //Test case for deleteUser database error handling
  test("deleteUser should handle errors", async () => {
    User.findByIdAndDelete = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
  //Test case for getMembersForUser
  test("getMembersForUser should return members for a user", async () => {
    Member.find = jest.fn().mockResolvedValue([{ firstName: "John" }]);

    const req = { params: { userId: "user123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getMembersForUser(req, res);
    expect(res.json).toHaveBeenCalledWith([{ firstName: "John" }]); //Check if res.json was called with member data
  });
  //Test case for getMembersForUser no members found
  test("getMembersForUser should return 404 if no members found", async () => {
    Member.find = jest.fn().mockResolvedValue([]);

    const req = { params: { userId: "user123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await UserController.getMembersForUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No members found for this user" }); //Check if res.json was called with not found message
  });
  //Test case for getMembersForUser error handling
  test("getMembersForUser should handle errors", async () => {
    Member.find = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = { params: { userId: "user123" } }; //Mock request object
    const res = mockRes(); //Mock response object
    await UserController.getMembersForUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" }); //Check if res.json was called with error message
  });
});
