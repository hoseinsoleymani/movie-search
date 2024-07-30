import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  video: false,
  screenshotOnRunFailure: false,

  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: [
      'src/pages/**/**.e2e.{ts,tsx}',
      // 'src/pages/**/**.spec.ts'
    ],
    supportFile: 'cypress/support/e2e.ts',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/**.cy.tsx',
    supportFile: 'cypress/support/component.tsx',

    setupNodeEvents(_, config) {
      return config;
    },
  },
});