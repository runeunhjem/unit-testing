import { followUser } from "./follow.js";

describe("followUser", () => {
  it("should follow a user", () => {
    const userId = "user123";
    const followedUserId = "user456";
    const result = followUser(userId, followedUserId, true);
    expect(result).toBe(`${userId} is now following ${followedUserId}`);
  });

  it("should unfollow a user", () => {
    const userId = "user123";
    const followedUserId = "user456";
    const result = followUser(userId, followedUserId, false);
    expect(result).toBe(`${userId} has unfollowed ${followedUserId}`);
  });
});
