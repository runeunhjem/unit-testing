// register.test.js
import { registerUser } from "./register.js";

describe("User Registration", () => {
  it("registers a new user", () => {
    const result = registerUser("JohnDoe", "password123");
    expect(result.success).toBe(true);
    expect(result.message).toBe("User registration successful.");
  });

  it("attempts to register with an existing username", () => {
    const result = registerUser("JohnDoe", "newPassword");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Username is already taken.");
  });

  // Add more test cases related to user registration here
});
