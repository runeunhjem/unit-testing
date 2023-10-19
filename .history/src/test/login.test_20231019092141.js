/* global global */

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

    expect(response.accessToken).toBe("token");
    expect(localStorage.getItem("accessToken")).toBe("token");
    // Additional expectations for other localStorage items...

    // Expect the login button to be updated
    const loginButton = document.getElementById("login-button");
    expect(loginButton.textContent).toBe("Success");
    expect(loginButton.classList).toContain("btn-success", "text-light", "fw-bold");

    // Verify fetch call was made
    expect(fetchMock).toHaveBeenCalledWith(url, expect.objectContaining({ method: "POST" }));
  });

  it("should handle a failed login", async () => {
    fetchMock.mockResponse("Login failed!", { status: 401 });

    const url = "https://example.com/login";
    const userData = { email: "test@example.com", password: "wrong-password" };

    try {
      await loginUser(url, userData);
    } catch (error) {
      expect(error.message).toBe("Login failed!");
    }
  });

  it("should handle network errors", async () => {
    fetchMock.mockReject(new Error("Network error"));

    const url = "https://example.com/login";
    const userData = { email: "test@example.com", password: "password" };

    try {
      await loginUser(url, userData);
    } catch (error) {
      expect(error.message).toBe("Network error");
    }
  });
});
