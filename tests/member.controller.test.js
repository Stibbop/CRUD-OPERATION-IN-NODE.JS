const MemberController = require("../controllers/MemberController"); //Import MemberController
const Member = require("../models/Member"); //Import Member model

jest.mock("../models/Member"); //Mock Member model

//Mock response object
const mockRes = () => { 
  const res = {};
  res.status = jest.fn().mockReturnValue(res); 
  res.json = jest.fn(); 
  return res;
};

// Test suite for MemberController
describe("Member Controller Tests", () => {
    //Test case for createMember
  test("createMember should create a member", async () => {
    Member.mockImplementation(() => ({ 
      save: jest.fn().mockResolvedValue(true), // mock function that resolves value to true 
    }));
    //Mock request object
    const req = {
      body: {
        firstName: "John",
        middleName: "A.",
        lastName: "Bistro",
        civilStatus: "Single",
        email: "john2025@test.com",
      },
    };
    //Mock response object
    const res = mockRes();
    await MemberController.createMember(req, res);
    //Check if res.json was called
    expect(res.json).toHaveBeenCalled();
  });
  //Test case for getAllMembers
  test("getAllMembers should return members", async () => {
    Member.find = jest.fn().mockResolvedValue([]); //Mock find method to return empty array

    const req = {}; //Mock request object
    const res = mockRes(); //Mock response object

    await MemberController.getAllMembers(req, res);
    //Check if res.json was called
    expect(res.json).toHaveBeenCalled();
  });
  //Test case for deleteMember
  test("deleteMember returns success message", async () => {
    Member.findByIdAndDelete = jest.fn().mockResolvedValue({}); //Mock findByIdAndDelete method to return empty object

    const req = { params: { id: "123" } }; //Mock request object
    const res = mockRes(); //Mock response object

    await MemberController.deleteMember(req, res);
    //Check if res.json was called with success message
    expect(res.json).toHaveBeenCalledWith({
      message: "Member deleted successfully",
    });
  });
});
