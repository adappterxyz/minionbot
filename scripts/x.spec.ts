import { test, expect } from '@playwright/test';
import path from 'path';

test('capture twitter screenshot', async ({ page }) => {
    // Get custom arguments if provided
    const customPath = process.env.TEST_ARG_SAVE_PATH || 'screenshots';
    const waitTime = parseInt(process.env.TEST_ARG_WAIT_TIME || '2000');

    // Navigate to Twitter
    await page.goto('https://twitter.com');
    
    // Wait for content to load
    await page.waitForTimeout(waitTime);

    // Ensure directory exists
    const screenshotPath = path.join(process.cwd(), customPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(screenshotPath, `twitter-${timestamp}.png`);

    // Take screenshot
    await page.screenshot({
        path: filePath,
        fullPage: true
    });

    console.log(`Screenshot saved to: ${filePath}`);
    
    // Store the path for the controller to access
    process.env.SCREENSHOT_PATH = filePath;
}); 