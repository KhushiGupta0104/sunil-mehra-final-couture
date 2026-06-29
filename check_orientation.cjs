const fs = require('fs');
const sizeOf = require('image-size');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'assets', 'images', 'new_content');

function checkOrientation(imgPath) {
    try {
        const fullPath = path.resolve(__dirname, 'src', 'assets', 'images', imgPath.replace('../assets/images/', ''));
        const dimensions = sizeOf(fullPath);
        if (dimensions.width > dimensions.height) {
            return 'landscape';
        } else {
            return 'portrait';
        }
    } catch (e) {
        return 'unknown';
    }
}

const content = fs.readFileSync('src/data/wardrobeData.js', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('import ') && line.includes('.jpg"')) {
        const match = line.match(/import (\w+) from "(.*?)";/);
        if (match) {
            const varName = match[1];
            const imgPath = match[2];
            const orientation = checkOrientation(imgPath);
            console.log(`${varName}: ${orientation}`);
        }
    }
}
