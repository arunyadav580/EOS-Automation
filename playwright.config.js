import { defineConfig, devices, chromium } from '@playwright/test';

require('dotenv').config();

export default defineConfig({

  fullyParallel: process.env.FULLY_PARALLEL.toLowerCase() == "true", 

  testDir: 'tests',

  timeout: 300 * 600000,

  // retries: 2,

  reporter: 'html',

  use: {

    browserName: 'chromium',
    headless: false,

    screenshot : 'on', 
    trace : 'retain-on-failure',

    ignoreHTTPSErrors: true,

  },

  expect : {timeout : 5000},
  
  projects: [
   
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //    name: 'webkit',
    //    use: { ...devices['Desktop Safari'] },
    // },
  ],

});
