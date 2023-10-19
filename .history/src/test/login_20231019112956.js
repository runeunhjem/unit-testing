// login.js
export async function loginUser(username, password) {
  if (username === "user" && password === "pass") {
    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Login failed" };
  }
}
