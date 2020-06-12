/*
 * Copyright (c) 2020 by Wladimir Guerra. All rights reserved.
 */

module.exports = {
  preset: "ts-jest",
  testTimeout: 40000,
  testEnvironment: "node",
  setupFiles: [
    "./test/dotEnvConfig.js",
  ],
};