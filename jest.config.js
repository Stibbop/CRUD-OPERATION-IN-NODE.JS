module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "controllers/**/*.js",
    "routes/**/*.js",
    "models/**/*.js",
    "!**/node_modules/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
