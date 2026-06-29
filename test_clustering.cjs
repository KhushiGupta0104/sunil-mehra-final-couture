const fs = require('fs');

const content = fs.readFileSync('src/data/wardrobeData.js', 'utf8');
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+"([^"]+)";/g;
let match;
const imports = [];

while ((match = importRegex.exec(content)) !== null) {
    const varName = match[1];
    const filePath = match[2];
    const fileName = filePath.split('/').pop();
    
    let prefix = 'Misc';
    let num = 0;
    
    const matches = [...fileName.matchAll(/(\d+)/g)];
    if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        num = parseInt(lastMatch[1], 10);
        prefix = fileName.substring(0, lastMatch.index).trim();
    } else {
        prefix = fileName.split(/[-_.]/)[0];
    }
    
    // Normalize prefix
    if (prefix.toLowerCase().includes('sunil mehra')) prefix = 'Sunil_Mehra';
    else if (prefix.toLowerCase().includes('tripti')) prefix = 'Tripti';
    else if (prefix.startsWith('066A')) prefix = '066A';
    else if (prefix.startsWith('IMG')) prefix = 'IMG';
    else if (prefix.startsWith('e')) prefix = 'Misc'; // UUIDs
    
    let categoryId = '';
    let category = '';
    if (filePath.includes('Bandhagla')) { categoryId = 'bandhagala-indo-western'; category = 'Bandhagla Sets & Indo-western'; }
    else if (filePath.includes('Jawahar')) { categoryId = 'jawahar-jackets'; category = 'Jawahar Jackets'; }
    else if (filePath.includes('Kurta')) { categoryId = 'kurta-sets'; category = 'Kurta Sets'; }
    else if (filePath.includes('Suits')) { categoryId = 'suits'; category = 'Suits'; }
    else if (filePath.includes('Winter')) { categoryId = 'winter'; category = 'Winter Collection'; }
    else if (filePath.includes('Accessories')) { categoryId = 'accessories'; category = 'Accessories'; }
    
    let subcat = null;
    if (categoryId === 'accessories') {
       subcat = filePath.split('Accessories/')[1].split('/')[0];
       prefix = `${subcat}_${prefix}`;
    }

    imports.push({ varName, filePath, fileName, prefix, num, categoryId, subcat });
}

const grouped = {};
for (const imp of imports) {
    if (!grouped[imp.categoryId]) grouped[imp.categoryId] = {};
    if (!grouped[imp.categoryId][imp.prefix]) grouped[imp.categoryId][imp.prefix] = [];
    grouped[imp.categoryId][imp.prefix].push(imp);
}

for (const [catId, prefixes] of Object.entries(grouped)) {
    console.log(`\n--- ${catId} ---`);
    for (const [prefix, imgs] of Object.entries(prefixes)) {
        imgs.sort((a, b) => a.num - b.num);
        
        let currentCluster = [];
        const clusters = [];
        
        for (let i = 0; i < imgs.length; i++) {
            if (currentCluster.length === 0) {
                currentCluster.push(imgs[i]);
            } else {
                const prev = currentCluster[currentCluster.length - 1];
                const gap = imgs[i].num - prev.num;
                // Gap logic: if gap > 50, start new look
                if (gap > 50) {
                    clusters.push(currentCluster);
                    currentCluster = [imgs[i]];
                } else {
                    currentCluster.push(imgs[i]);
                }
            }
        }
        if (currentCluster.length > 0) clusters.push(currentCluster);
        
        console.log(`Prefix: ${prefix}, Clusters: ${clusters.length}`);
        clusters.forEach((c, idx) => {
            console.log(`  Look ${idx + 1}: ${c.length} images (Range: ${c[0].num} - ${c[c.length-1].num}) - e.g. ${c[0].fileName}`);
        });
    }
}

