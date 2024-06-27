import { test, expect } from '@playwright/test';

//Browser Instances 
const { chromium, firefox, webkit } = require('playwright');

// test.use({ browserName: 'chromium' });

test("Browser Instances ", async () => {
    const browserChromium = await chromium.launch();
    const pageChromium = await browserChromium.newPage();
    await pageChromium.goto('https://google.com');
    await browserChromium.close();
});