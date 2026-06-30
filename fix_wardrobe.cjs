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
    
    const matches = [...fileName.matchAll(/(\d{3,})/g)];
    if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        num = parseInt(lastMatch[1], 10);
        prefix = fileName.substring(0, lastMatch.index).trim();
    } else {
        const fallback = fileName.match(/(\d+)/);
        if (fallback) {
            num = parseInt(fallback[1], 10);
            prefix = fileName.substring(0, fallback.index).trim();
        } else {
            prefix = fileName.split(/[-_.]/)[0];
        }
    }
    
    if (prefix.toLowerCase().includes('sunil mehra')) prefix = 'Sunil_Mehra';
    else if (prefix.toLowerCase().includes('tripti')) prefix = 'Tripti';
    else if (prefix.startsWith('066A')) prefix = '066A';
    else if (prefix.startsWith('IMG')) prefix = 'IMG';
    else if (prefix.startsWith('e')) prefix = 'Misc'; 
    
    let category = '';
    let categoryId = '';
    if (filePath.includes('Bandhagla')) { categoryId = 'bandhagala-indo-western'; category = 'Bandhagla Sets & Indo-western'; }
    else if (filePath.includes('Jawahar')) { categoryId = 'jawahar-jackets'; category = 'Jawahar Jackets'; }
    else if (filePath.includes('Kurta')) { categoryId = 'kurta-sets'; category = 'Kurta Sets'; }
    else if (filePath.includes('Suits')) { categoryId = 'suits'; category = 'Suits'; }
    else if (filePath.includes('Winter')) { categoryId = 'winter-collection'; category = 'Winter Collection'; }
    else if (filePath.includes('Accessories')) { categoryId = 'accessories'; category = 'Accessories'; }
    
    let subcat = null;
    if (categoryId === 'accessories') {
       subcat = filePath.split('Accessories/')[1].split('/')[0];
       prefix = `${subcat}_${prefix}`;
    }

    imports.push({ varName, filePath, fileName, category, categoryId, shoot: prefix, num, subcat });
}

const grouped = {};
for (const imp of imports) {
    if (!grouped[imp.categoryId]) grouped[imp.categoryId] = {};
    if (!grouped[imp.categoryId][imp.shoot]) grouped[imp.categoryId][imp.shoot] = [];
    grouped[imp.categoryId][imp.shoot].push(imp);
}

let newDataString = "export const WARDROBE_DATA = {\n";

const catMeta = {
    'bandhagala-indo-western': { name: 'Bandhagla Sets & Indo-western', edit: 'Tailored Royalty', desc: 'Sartorial precision meets regal Indian heritage. Clean, structured Bandhgalas and classic Sherwanis crafted from raw silk and wool blends.' },
    'jawahar-jackets': { name: 'Jawahar Jackets', edit: 'The Layered Statement', desc: 'The quintessential layer of sophistication. From understated linens for daytime engagements to richly embroidered silks for evening affairs.' },
    'kurta-sets': { name: 'Kurta Sets', edit: 'Flowing Heritage', desc: 'Effortless elegance for every celebration. Minimalist silhouettes paired with intricate detailing, designed for comfort without compromising on grandeur.' },
    'suits': { name: 'Suits', edit: 'The Modern Cut', desc: 'Impeccably tailored suits for the contemporary gentleman. Featuring sharp lines, premium Italian wools, and a flawless fit for the boardroom to the ballroom.' },
    'winter-collection': { name: 'Winter Collection', edit: 'Warmth & Elegance', desc: 'Layered luxury for the colder months. Hand-spun pashminas, structured overcoats, and rich velvets that command attention.' },
    'accessories': { name: 'Accessories', edit: 'The Final Touch', desc: 'Curated essentials to complete the look. From hand-welted leather shoes to silk pocket squares, every detail matters.' }
};

for (const [catId, prefixesObj] of Object.entries(grouped)) {
    const meta = catMeta[catId];
    newDataString += `    "${catId}": {\n`;
    newDataString += `        name: "${meta.name}",\n`;
    newDataString += `        edit: "${meta.edit}",\n`;
    newDataString += `        description: "${meta.desc}",\n`;
    
    if (catId === 'accessories') {
        const subcats = new Set();
        for (const [_, imgs] of Object.entries(prefixesObj)) {
            imgs.forEach(i => i.subcat && subcats.add(i.subcat));
        }
        newDataString += `        subcategories: [\n`;
        for (const sub of Array.from(subcats)) {
            const id = sub.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            newDataString += `            { id: "${id}", name: "${sub}" },\n`;
        }
        newDataString += `        ],\n`;
    }

    newDataString += `        looks: [\n`;
    
    let lookIndex = 1;
    for (const [prefix, imgs] of Object.entries(prefixesObj)) {
        imgs.sort((a, b) => a.num - b.num);
        let currentCluster = [];
        const clusters = [];
        for (let i = 0; i < imgs.length; i++) {
            if (currentCluster.length === 0) {
                currentCluster.push(imgs[i]);
            } else {
                const prev = currentCluster[currentCluster.length - 1];
                const gap = imgs[i].num - prev.num;
                if (gap > 15) {
                    clusters.push(currentCluster);
                    currentCluster = [imgs[i]];
                } else {
                    currentCluster.push(imgs[i]);
                }
            }
        }
        if (currentCluster.length > 0) clusters.push(currentCluster);
        
        for (const cluster of clusters) {
            for (let i = 0; i < cluster.length; i += 8) {
                const chunk = cluster.slice(i, i + 8);
                const subcat = chunk[0].subcat;
                const subcatId = subcat ? subcat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : null;
                const lookName = subcat ? `${subcat} - Look ${lookIndex}` : `${prefix.replace(/_/g, ' ')} - Look ${lookIndex}`;
                
                newDataString += `            { \n`;
                newDataString += `                id: "look_${catId.replace(/-/g, '')}_${lookIndex}",\n`;
                newDataString += `                name: "${lookName}",\n`;
                if (subcatId) newDataString += `                subcat: "${subcatId}",\n`;
                newDataString += `                coverImg: ${chunk[0].varName},\n`;
                newDataString += `                gallery: [${chunk.map(img => img.varName).join(', ')}]\n`;
                newDataString += `            },\n`;
                lookIndex++;
            }
        }
    }
    newDataString += `        ]\n`;
    newDataString += `    },\n`;
}

newDataString += "};\n";

const beforeExport = content.split("export const WARDROBE_DATA =")[0];
fs.writeFileSync('src/data/wardrobeData.js', beforeExport + newDataString);
console.log("Success");
