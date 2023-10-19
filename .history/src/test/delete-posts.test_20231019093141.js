/* global global */
import { deletePost } from "./src/test/delete-posts.mjs";

global.fetch = require("node-fetch"); // For mocking fetch

describe("deletePost", () => {
  beforeEach(() => {
    // Clear any mocked fetch calls before each test
    fetch.resetMocks();
  });

  it("should delete a post when authorized", async () => {
    // Mock a successful response
    fetch.mockResponse(JSON.stringify({ message: "Post deleted successfully" }), {
      status: 200, // Simulating a successful deletion response
    });

    localStorage.setItem("authorName", "loggedInUser"); // Simulate logged-in user

    const postId = "123";
    const response = await deletePost(postId);

    expect(response).toEqual({ message: "Post deleted successfully" });
  });

  it("should not delete a post when not authorized", async () => {
    // Mock an unsuccessful response
    fetch.mockResponse("You can only delete your own posts.", { status: 403 });

    localStorage.setItem("authorName", "anotherUser"); // Simulate a different user

    const postId = "456";
    await deletePost(postId);

    // Check if an alert message is displayed
    const alertMessage = window.alert.mock.calls[0][0];
    expect(alertMessage).toBe("You can only delete your own posts.");
  });

  it("should handle network errors", async () => {
    // Mock a network error
    fetch.mockReject(new Error("Network error"));

    localStorage.setItem("authorName", "loggedInUser"); // Simulate logged-in user

    const postId = "789";
    let error;

    try {
      await deletePost(postId);
    } catch (error) {
      error = error;
    }

    // Check if an error was thrown
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Network error");
  });
});
