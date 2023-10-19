export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "mjs", "json"],
  transform: {},
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {},
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  modulePathIgnorePatterns: ["/node_modules/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  // Specify that you're using ESM
  type: "module",
};
