class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge() {
    return this.age;
  }
}

export default User;

describe("User", () => {
  it("should create a User instance", () => {
    const user = new User("John", "Doe", 30);

    expect(user).toBeInstanceOf(User);
  });

  it("should get the full name of the user", () => {
    const user = new User("John", "Doe", 30);

    const fullName = user.getFullName();

    expect(fullName).toBe("John Doe");
  }