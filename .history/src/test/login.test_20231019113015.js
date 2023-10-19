import { loginUser } from "./login";

describe("loginUser", () => {
  it("should return success when valid credentials are provided", async () => {
    const result = await loginUser("user", "pass");
    expect(result).toEqual({ success: true, message: "Login successful" });
  });

  it("should return failure when invalid credentials are provided", async () => {
    const result = await loginUser("invalidUser", "invalidPassword");
    expect(result).toEqual({ success: false, message: "Login failed" });
  });
});
