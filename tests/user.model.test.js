const Member = require("../models/Member"); //Import Member model

jest.mock("../models/Member"); //Mock Member model

//Test suite for User Model
describe("User Model Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test case for User model pre-remove middleware
  test("User pre-remove middleware should delete associated members", async () => {
    const User = require("../models/User"); //Import User model
    
    // Create a mock user instance with necessary methods
    const mockUser = {
      _id: "691e5ba884f35e6b2edd5f7a",
      firstName: "John",
      middleName: "A.",
      lastName: "Bistro",
      email: "john2026@example.com",
      civil_Status: "Single"
    };

    // Mock Member.deleteMany to track if it's called   
    Member.deleteMany = jest.fn().mockResolvedValue({ deletedCount: 2 });

    // Get and execute the pre-remove middleware directly
    const nextMock = jest.fn();
    const schema = User.schema;
    
    // Access the pre-remove hook and call it
    const hooks = schema.s.hooks._pres.get('remove');
    if (hooks && hooks.length > 0) {
      await hooks[0].fn.call(mockUser, nextMock);
    }

    // Verify Member.deleteMany was called with correct user ID
    expect(Member.deleteMany).toHaveBeenCalledWith({ user: mockUser._id });
    expect(nextMock).toHaveBeenCalled();
  });
});
