import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

(async () => {
    // We will save to the artifacts scratch directory
    const scratchDir = '/Users/not_bunny/.gemini/antigravity-ide/brain/59dd221a-ffe2-4c86-b550-46221ce40fc2/scratch';
    if (!fs.existsSync(scratchDir)) {
        fs.mkdirSync(scratchDir, { recursive: true });
    }

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const routes = [
        { name: 'home', url: 'http://localhost:5173/' },
        { name: 'wardrobe', url: 'http://localhost:5173/wardrobe' },
        { name: 'gallery', url: 'http://localhost:5173/gallery' },
        { name: 'about', url: 'http://localhost:5173/about' },
        { name: 'salons', url: 'http://localhost:5173/salons' },
        { name: 'booking', url: 'http://localhost:5173/book' },
        { name: 'atelier', url: 'http://localhost:5173/atelier' }
    ];

    for (const route of routes) {
        console.log(`Navigating to ${route.name}...`);
        await page.goto(route.url, { waitUntil: 'networkidle2' });
        
        // Let any animations finish
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const screenshotPath = path.join(scratchDir, `screenshot_${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Saved screenshot for ${route.name}`);
    }

    await browser.close();
    console.log('All screenshots captured successfully!');
})();
