
import { createNewPost } from "./create-new-post.mjs";

global.fetch = require("node-fetch"); // For mocking fetch

describe("createNewPost", () => {
  beforeEach(() => {
    // Clear any mocked fetch calls before each test
    fetch.resetMocks();
  });

  it("should create a new post", async () => {
    // Mock a successful response
    fetch.mockResponse(JSON.stringify({ id: 1, title: "New Post" }), {
      status: 201, // Simulating a successful creation response
    });

    const url = "https://example.com/api/posts";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Post" }),
    };

    const newPost = await createNewPost(url, options);

    expect(newPost).toEqual({ id: 1, title: "New Post" });
  });

  it("should handle a failed post creation", async () => {
    // Mock an unsuccessful response
    fetch.mockResponse("Failed to create a new post", { status: 400 });

    const url = "https://example.com/api/posts";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Invalid Post" }),
    };

    try {
      await createNewPost(url, options);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Failed to create a new post");
    }
  });

  it("should handle network errors", async () => {
    // Mock a network error
    fetch.mockReject(new Error("Network error"));

    const url = "https://example.com/api/posts";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Post" }),
    };

    try {
      await createNewPost(url, options);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Network error");
    }
  });
});
