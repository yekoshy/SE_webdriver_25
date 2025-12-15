import { devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: '.',
  // Force Playwright to use a single worker so projects/tests run serially
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  use: {
    headless: false,
    launchOptions: { slowMo: 50 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  reporter: [['list']],
};

export default config;
