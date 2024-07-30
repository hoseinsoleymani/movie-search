module.exports = {
  // other configurations
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};
