import { JestConfigWithTsJest, pathsToModuleNameMapper} from "ts-jest"
const { compilerOptions } = require("./tsconfig.json")

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig : JestConfigWithTsJest  = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/','<rootDir>/node_modules/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })

}
export default jestConfig