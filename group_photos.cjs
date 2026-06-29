const fs = require('fs');

const content = fs.readFileSync('src/data/wardrobeData.js', 'utf8');

// Parse imports
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+"([^"]+)";/g;
let match;
const imports = {};

while ((match = importRegex.exec(content)) !== null) {
    const varName = match[1];
    const filePath = match[2];
    const fileName = filePath.split('/').pop();
    
    // Determine category based on path or var name
    let category = '';
    if (filePath.includes('Bandhagla')) category = 'bandhagala-indo-western';
    else if (filePath.includes('Jawahar')) category = 'jawahar-jackets';
    else if (filePath.includes('Kurta')) category = 'kurta-sets';
    else if (filePath.includes('Suits')) category = 'suits';
    else if (filePath.includes('Winter')) category = 'winter';
    else if (filePath.includes('Accessories')) category = 'accessories';
    
    // Determine prefix/shoot based on filename
    let shoot = 'default';
    if (fileName.startsWith('066A')) shoot = '066A';
    else if (fileName.startsWith('IMG')) shoot = 'IMG';
    else if (fileName.startsWith('Sunil Mehra_') || fileName.startsWith('Sunil Mehra ')) {
        // e.g. "Sunil Mehra  1043.jpg" or "Sunil Mehra_3610.jpg"
        // Let's group by thousand? e.g. 1000s, 3000s, 8000s
        const numMatch = fileName.match(/\d{4}/);
        if (numMatch) {
            const num = parseInt(numMatch[0]);
            shoot = `SM_${Math.floor(num / 1000) * 1000}s`;
        } else {
            shoot = 'SM_Other';
        }
    } else if (fileName.startsWith('tripti')) {
        shoot = 'Tripti';
    } else {
        shoot = fileName.split(/[-_ ]/)[0]; // Just use first word
    }
    
    // For accessories, group by subcategory too if possible
    if (category === 'accessories') {
       const sub = filePath.split('Accessories/')[1].split('/')[0];
       shoot = `Acc_${sub.replace(/\s+/g, '_')}`;
    }

    imports[varName] = { filePath, fileName, category, shoot };
}

console.log(Object.values(imports).slice(0, 20));
