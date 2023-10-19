/* global global */
import { deletePost } from "./delete-posts.js";
import { LocalStorage } from "node-localstorage";
import fetchMock from "jest-fetch-mock"; // Import 'jest-fetch-mock'

fetchMock.enableMocks(); // Enable fetch mocking
const localStorage = new LocalStorage("./scratch");

global.fetch = require("node-fetch"); // For mocking fetch

describe("deletePost", () => {
  beforeEach(() => {
    // Clear any mocked fetch calls before each test
    fetchMock.resetMocks();
  });

  it("should delete a post when authorized", async () => {
    // Mock a successful response
    fetchMock.mockResponse(JSON.stringify({ message: "Post deleted successfully" }), {
      status: 200, // Simulating a successful deletion response
    });

    localStorage.setItem("authorName", "loggedInUser"); // Simulate logged-in user

    const postId = "123";
    const response = await deletePost(postId);

    expect(response).toEqual({ message: "Post deleted successfully" });
  });

  it("should not delete a post when not authorized", async () => {
    // Mock an unsuccessful response
    fetchMock.mockResponse("You can only delete your own posts.", { status: 403 });

    localStorage.setItem("authorName", "anotherUser"); // Simulate a different user

    const postId = "456";
    await deletePost(postId);

    // Check if an alert message is displayed
    const alertMessage = window.alert.mock.calls[0][0];
    expect(alertMessage).toBe("You can only delete your own posts.");
  });

  it("should handle network errors", async () => {
    // Mock a network error
    fetchMock.mockReject(new Error("Network error"));

    localStorage.setItem("authorName", "loggedInUser"); // Simulate logged-in user

    const postId = "789";
    let error;

    try {
      await deletePost(postId);
    } catch (e) {
      error = e;
    }

    // Check if an error was thrown
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Network error");
  });
});
