import { loginUser } from "./login.mjs";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("loginUser", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should log in a user and save relevant data to local storage on successful login", async () => {
    fetchMock.mockResponse(JSON.stringify({ accessToken: "token", name: "user" }), {
      status: 200,
    });

    const url = "https://example.com/login";
    const userData = { email: "test@example.com", password: "password" };

    const response = await loginUser(url, userData);

    // Verify response data
    expect(response).toEqual({ accessToken: "token", name: "user" });

    // Verify localStorage items
    expect(localStorage.getItem("accessToken")).toBe("token");
    // Add additional expectations for other localStorage items...

    // Verify the login button
    const loginButton = document.getElementById("login-button");
    expect(loginButton.textContent).toBe("Success");
    expect(loginButton.classList).toContain("btn-success", "text-light", "fw-bold");

    // Verify that a fetch call was made
    expect(fetchMock).toHaveBeenCalledWith(url, expect.objectContaining({ method: "POST" }));
  });

  it("should handle a failed login", async () => {
    fetchMock.mockResponse("Login failed!", { status: 401 });

    const url = "https://example.com/login";
    const userData = { email: "test@example.com", password: "wrong-password" };

    // Use a try...catch block to capture the expected error
    let error;

    try {
      await loginUser(url, userData);
    } catch (error) {
      error = e;
    }

    // Check the error message
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Login failed!");
  });

  it("should handle network errors", async () => {
    fetchMock.mockReject(new Error("Network error"));

    const url = "https://example.com/login";
    const userData = { email: "test@example.com", password: "password" };

    // Use a try...catch block to capture the expected error
    let error;

    try {
      await loginUser(url, userData);
    catch (e) {
      error = e;
    }

    // Check the error message
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Network error");
  });
});
