// register.js

// Simulated user database (for demonstration purposes)
const usersDatabase = [];

// Function to register a user
function registerUser(username, password) {
  // Check if the username is already taken
  const isUsernameTaken = usersDatabase.some((user) => user.username === username);

  if (isUsernameTaken) {
    return { success: false, message: "Username is already taken." };
  }

  // If the username is not taken, create a new user object
  const newUser = { username, password };

  // For simplicity, we're just pushing the user to a simulated database
  usersDatabase.push(newUser);

  return { success: true, message: "User registration successful." };
  // Function to simulate submitting a registration form
  function submitRegistrationForm() {
    // Perform submission logic here
    console.log("Registration form submitted.");
  }

}

export { registerUser, submitRegistrationForm };

