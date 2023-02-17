const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.(js|jsx|ts|tsx)$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
