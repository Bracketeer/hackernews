// import { jsWithTsESM } from "ts-jest/presets";

export default {
  // ...jsWithTsESM,
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',  {
        isModule: true,
        jsc: {
          transform: {
            optimizer: {
              globals: {
                vars: {
                  "import.meta.env": "process.env",
                },
              },
            },
            // Everything below here is just my own config, probably not relevant
            react: {
              runtime: "automatic",
            },
          },
        },
    },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};