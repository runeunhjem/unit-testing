/*
import User from "./user.mjs";

describe("User", () => {
  it("should create a User instance", () => {
    const user = new User("John", "Doe", 30);

    expect(user).toBeInstanceOf(User);
  });

  it("should get the full name of the user", () => {
    const user = new User("John", "Doe", 30);

    const fullName = user.getFullName();

    expect(fullName).toBe("John Doe");
  });

  it("should get the age of the user", () => {
    const user = new User("Jane", "Smith", 25);

    const age = user.getAge();

    expect(age).toBe(25);
  });
});
