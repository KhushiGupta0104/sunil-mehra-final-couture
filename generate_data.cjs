const fs = require('fs');
const path = require('path');

const NEW_CONTENT_DIR = 'src/assets/images/new_content';
const lines = fs.readFileSync('all_photos.txt', 'utf8').split('\n').filter(Boolean);

const shoots = [];

lines.forEach(line => {
    const parts = line.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    
    // Determine category based on directory structure
    let category = "unknown";
    if (dir.includes("Winter Collection")) category = "winter-collection";
    else if (dir.includes("Accessories")) category = "accessories";
    else if (dir.includes("Bandhagla Sets")) category = "bandhagala-indo-western";
    else if (dir.includes("Jawahar Jacket")) category = "jawahar-jackets";
    else if (dir.includes("Suits")) category = "suits";
    else if (dir.includes("Kurta Sets")) category = "kurta-sets";
    
    let base = "";
    let num = null;
    
    const match = filename.match(/^([A-Za-z\s_-]+)?(\d+)?(.*)$/);
    if (match) {
        base = (match[1] || "").trim();
        num = match[2] ? parseInt(match[2], 10) : null;
        if (!base && filename.startsWith("066A")) {
            base = "066A";
            const numMatch = filename.match(/066A(\d+)/);
            num = numMatch ? parseInt(numMatch[1], 10) : null;
        }
    }
    
    let found = false;
    for (const shoot of shoots) {
        if (shoot.dir === dir && shoot.base === base) {
            if (num !== null && shoot.nums.length > 0) {
                if (shoot.nums.some(n => Math.abs(n - num) <= 100)) {
                    shoot.photos.push(filename);
                    shoot.nums.push(num);
                    found = true;
                    break;
                }
            } else if (num === null && shoot.nums.length === 0) {
                 shoot.photos.push(filename);
                 found = true;
                 break;
            }
        }
    }
    
    if (!found) {
        shoots.push({
            dir,
            base,
            category,
            nums: num !== null ? [num] : [],
            photos: [filename]
        });
    }
});

// Build wardrobe data structure
const CATEGORIES = {
    "winter-collection": { name: "Winter Collection", edit: "The Alpine Edit", desc: "Luxurious warmth meets tailored precision." },
    "accessories": { name: "Accessories", edit: "Atelier Details", desc: "The defining touches of the Sunil Mehra gentleman." },
    "bandhagala-indo-western": { name: "Bandhgala & Indo-Western", edit: "Heritage Modernity", desc: "Iconic silhouettes bridging traditional opulence with sharp contemporary tailoring." },
    "jawahar-jackets": { name: "Jawahar Jackets", edit: "The Signature Vest", desc: "Versatile, handcrafted layers for elevated ethnic style." },
    "suits": { name: "Bespoke Suits", edit: "Sartorial Excellence", desc: "Masterfully constructed formalwear." },
    "kurta-sets": { name: "Kurta Sets", edit: "Timeless Occasion", desc: "Effortless elegance crafted from premium fabrics." }
};

let output = '';
let importCount = 0;

const catsData = {};

shoots.forEach((shoot, shootIndex) => {
    const cat = shoot.category;
    if (!catsData[cat]) catsData[cat] = [];
    
    const lookObj = { coverImg: null, gallery: [] };
    
    shoot.photos.forEach((photo, photoIndex) => {
        const importName = `Img_${shootIndex}_${photoIndex}`;
        const relativePath = `../${shoot.dir.replace('src/', '')}/${photo}`;
        output += `import ${importName} from "${relativePath}";\n`;
        
        if (photoIndex === 0) lookObj.coverImg = importName;
        else lookObj.gallery.push(importName);
    });
    
    catsData[cat].push(lookObj);
});

output += `\nexport const WARDROBE_DATA = {\n`;

Object.keys(CATEGORIES).forEach(catSlug => {
    const info = CATEGORIES[catSlug];
    const looks = catsData[catSlug] || [];
    
    output += `    "${catSlug}": {\n`;
    output += `        id: "${catSlug}",\n`;
    output += `        name: "${info.name}",\n`;
    output += `        edit: "${info.edit}",\n`;
    output += `        description: "${info.desc}",\n`;
    
    if (catSlug === "accessories") {
        output += `        subcategories: [\n`;
        output += `            { id: "loafers", name: "Loafers", desc: "Refined footwear." },\n`;
        output += `            { id: "bags", name: "Bags", desc: "Signature leather goods." },\n`;
        output += `            { id: "monks", name: "Monks", desc: "Classic monk straps." },\n`;
        output += `            { id: "sneakers", name: "Sneakers", desc: "Elevated casuals." }\n`;
        output += `        ],\n`;
    }
    
    output += `        looks: [\n`;
    looks.forEach(look => {
        let galleryStr = look.gallery.length > 0 ? `[${look.gallery.join(', ')}]` : `[]`;
        
        // simple heuristic for subcategories in accessories
        let subcat = "null";
        if (catSlug === "accessories") {
             const firstPhotoDir = shoots.find(s => catsData[catSlug].includes(look)).dir;
             if (firstPhotoDir.toLowerCase().includes("loafer")) subcat = `"loafers"`;
             else if (firstPhotoDir.toLowerCase().includes("bag")) subcat = `"bags"`;
             else if (firstPhotoDir.toLowerCase().includes("monk")) subcat = `"monks"`;
             else if (firstPhotoDir.toLowerCase().includes("sneaker")) subcat = `"sneakers"`;
        }
        
        output += `            { coverImg: ${look.coverImg}, gallery: ${galleryStr}, subcat: ${subcat} },\n`;
    });
    output += `        ]\n    },\n`;
});

output += `};\n`;

fs.writeFileSync('src/data/wardrobeData.js', output);
console.log('Successfully generated src/data/wardrobeData.js');
