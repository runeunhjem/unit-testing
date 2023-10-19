// follow.js
export function followUser(userId, followedUserId, follow = true) {
  // Logic for following or unfollowing a user
  if (follow) {
    // Perform the follow operation
    return `${userId} is now following ${followedUserId}`;
  } else {
    // Perform the unfollow operation
    return `${userId} has unfollowed ${followedUserId}`;
  }
}
