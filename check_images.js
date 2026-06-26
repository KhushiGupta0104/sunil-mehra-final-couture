import fs from 'fs';
// Since wardrobeData is a module with React imports, it might fail to load in raw node if it imports Vite assets directly.
// Let's just parse the file directly.
const dataFile = './src/data/wardrobeData.js';
const content = fs.readFileSync(dataFile, 'utf-8');

const importRegex = /import\s+(\w+)\s+from\s+"([^"]+)"/g;
let match;
const imports = new Set();
while ((match = importRegex.exec(content)) !== null) {
    imports.add(match[1]);
}

const imagesRegex = /images:\s*\[([^\]]+)\]/g;
let m;
let missing = 0;
let total = 0;
while ((m = imagesRegex.exec(content)) !== null) {
    const vars = m[1].split(',').map(s => s.trim()).filter(s => s);
    for (const v of vars) {
        total++;
        if (!imports.has(v)) {
            console.log("Missing import for:", v);
            missing++;
        }
    }
}

console.log(`Total images referenced: ${total}. Missing imports: ${missing}`);
