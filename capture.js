import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 80);
        });
    });
}

(async () => {
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
        { name: 'wardrobe_bandhagala', url: 'http://localhost:5173/wardrobe/bandhagala-indo-western' },
        { name: 'wardrobe_suits', url: 'http://localhost:5173/wardrobe/suits' },
        { name: 'wardrobe_kurta', url: 'http://localhost:5173/wardrobe/kurta-sets' },
        { name: 'wardrobe_jawahar', url: 'http://localhost:5173/wardrobe/jawahar-jackets' },
        { name: 'wardrobe_winter', url: 'http://localhost:5173/wardrobe/winter-collection' },
        { name: 'wardrobe_accessories', url: 'http://localhost:5173/wardrobe/accessories' },
        { name: 'gallery', url: 'http://localhost:5173/gallery' },
        { name: 'atelier', url: 'http://localhost:5173/atelier' },
        { name: 'editorial', url: 'http://localhost:5173/editorial' },
        { name: 'appointment', url: 'http://localhost:5173/appointment' },
        { name: 'terms', url: 'http://localhost:5173/terms' },
        { name: 'privacy', url: 'http://localhost:5173/privacy' },
        { name: 'faq', url: 'http://localhost:5173/faq' },
        { name: 'admin', url: 'http://localhost:5173/admin' },
    ];

    for (const route of routes) {
        console.log(`Capturing ${route.name}...`);
        await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 15000 });

        // Scroll down fully to trigger all lazy-loaded content and animations
        await autoScroll(page);

        // Scroll back to the top
        await page.evaluate(() => window.scrollTo(0, 0));

        // Wait for animations to settle
        await new Promise(resolve => setTimeout(resolve, 2000));

        const screenshotPath = path.join(scratchDir, `audit_${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  -> Saved audit_${route.name}.png`);
    }

    await browser.close();
    console.log('Full audit capture complete!');
})();
