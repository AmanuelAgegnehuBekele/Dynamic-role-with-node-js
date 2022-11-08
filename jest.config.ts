import type { Config } from "jest";

const config: Config = {
  verbose: true,
  rootDir: "./test",
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
};

export default config;
