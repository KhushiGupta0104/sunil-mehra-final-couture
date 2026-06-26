import fs from 'fs';
import path from 'path';

const contentDir = 'src/assets/images/new_content';
const baseImagesDir = 'src/assets/images';

// Helper to walk directories
function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        if (file === '.DS_Store') return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(filePath));
        } else {
            results.push(filePath);
        }
    });
    return results;
}

const allFiles = walkDir(contentDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

const categories = {
    'Bandhagla Sets & Indo-western': [],
    'Jawahar Jacket Sets': [],
    'Kurta Sets': [],
    'Suits': [],
    'Winter Collection': [],
    'Accessories': {
        'Bags': [],
        'Broach': [],
        'Brooks Lace up': [],
        'Loafers': [],
        'Monks': [],
        'Ostrich Leather Wallet': [],
        'Sneakers': []
    }
};

allFiles.forEach(file => {
    if (file.includes('/Bandhagla Sets & Indo-western/')) categories['Bandhagla Sets & Indo-western'].push(file);
    else if (file.includes('/Jawahar Jacket Sets/')) categories['Jawahar Jacket Sets'].push(file);
    else if (file.includes('/Kurta Sets/')) categories['Kurta Sets'].push(file);
    else if (file.includes('/Suits/')) categories['Suits'].push(file);
    else if (file.includes('/Winter Collection/')) categories['Winter Collection'].push(file);
    else if (file.includes('/Accessories/')) {
        if (file.includes('/Bags/')) categories['Accessories']['Bags'].push(file);
        else if (file.includes('/Broach/')) categories['Accessories']['Broach'].push(file);
        else if (file.includes('/Brooks Lace up/')) categories['Accessories']['Brooks Lace up'].push(file);
        else if (file.includes('/Loafers/')) categories['Accessories']['Loafers'].push(file);
        else if (file.includes('/Monks/')) categories['Accessories']['Monks'].push(file);
        else if (file.includes('/Ostrich Leather Wallet/')) categories['Accessories']['Ostrich Leather Wallet'].push(file);
        else if (file.includes('/Sneakers/')) categories['Accessories']['Sneakers'].push(file);
    }
});

let imports = '';
let dataGen = 'export const WARDROBE_DATA = {\n';

// We map file paths to variable names
let varCount = 0;
const fileToVar = {};

function addImports(fileList, prefix) {
    let pieces = [];
    fileList.forEach((file, index) => {
        const varName = `${prefix}_${index}`;
        // file is relative to project root, need relative to src/data/wardrobeData.js which we might put in src/data, or just src/utils
        // Let's output to src/data/wardrobeData.js, so relative to src/data
        const relPath = '../' + file.replace(/\\/g, '/').replace('src/', ''); 
        imports += `import ${varName} from "${relPath}";\n`;
        fileToVar[file] = varName;
        pieces.push(`{ name: "${prefix.replace(/_/g, ' ')} — Piece ${String(index + 1).padStart(2, '0')}", img: ${varName} }`);
    });
    return pieces;
}

const bandhaglaPieces = addImports(categories['Bandhagla Sets & Indo-western'], 'Bandhagla');
const jawaharPieces = addImports(categories['Jawahar Jacket Sets'], 'Jawahar_Jacket');
const kurtaPieces = addImports(categories['Kurta Sets'], 'Kurta_Set');
const suitPieces = addImports(categories['Suits'], 'Sartorial_Suit');
const winterPieces = addImports(categories['Winter Collection'], 'Winter_Overcoat');

// Accessories
const bagsPieces = addImports(categories['Accessories']['Bags'], 'Bag');
const broachPieces = addImports(categories['Accessories']['Broach'], 'Broach');
const lacePieces = addImports(categories['Accessories']['Brooks Lace up'], 'Lace_up');
const loaferPieces = addImports(categories['Accessories']['Loafers'], 'Loafer');
const monkPieces = addImports(categories['Accessories']['Monks'], 'Monk');
const walletPieces = addImports(categories['Accessories']['Ostrich Leather Wallet'], 'Wallet');
const sneakerPieces = addImports(categories['Accessories']['Sneakers'], 'Sneaker');

dataGen += `    "bandhagala-indo-western": {
        name: "Bandhagla Sets & Indo-western",
        edit: "Tailored Royalty",
        description: "Sartorial precision meets regal Indian heritage. Clean, structured Bandhgalas and classic Sherwanis crafted from raw silk and wool blends.",
        pieces: [
            ${bandhaglaPieces.join(',\n            ')}
        ]
    },\n`;

dataGen += `    "kurta-sets": {
        name: "Kurta Sets",
        edit: "Quiet Luxury",
        description: "Elevated comfort in pure hand-woven silk and light linen, cut with fluid, graceful lines.",
        pieces: [
            ${kurtaPieces.join(',\n            ')}
        ]
    },\n`;

dataGen += `    "jawahar-jackets": {
        name: "Jawahar Jacket Sets",
        edit: "Modern Maharaja",
        description: "A timeless Indian silhouette, reimagined. Hand-crafted Nehru jackets and sadris layered for modern elegance.",
        pieces: [
            ${jawaharPieces.join(',\n            ')}
        ]
    },\n`;

dataGen += `    "winter-collection": {
        name: "Winter Collection",
        edit: "Princely Silhouettes",
        description: "Premium tailored winter wear. Elegant structured double-breasted coats, trench layers, and rich wool suits.",
        pieces: [
            ${winterPieces.join(',\n            ')}
        ]
    },\n`;

dataGen += `    suits: {
        name: "Sartorial Suits",
        edit: "Sharply Cut",
        description: "Sharply cut for the modern gentleman. Double-breasted and single-breasted options in wool and silk blends.",
        pieces: [
            ${suitPieces.join(',\n            ')}
        ]
    },\n`;

const subCats = [
    { id: "bags", name: "Bags", pieces: bagsPieces, desc: "Bespoke leather travel luggage, portfolios, and daily document cases." },
    { id: "brooches", name: "Brooches", pieces: broachPieces, desc: "Intricately detailed gold crests, silver pins, and maison emblems." },
    { id: "lace-ups", name: "Lace-ups", pieces: lacePieces, desc: "Hand-crafted formal oxfords and derbies built from premium skins." },
    { id: "loafers", name: "Loafers", pieces: loaferPieces, desc: "Sophisticated suede slip-ons, tassel loafers, and heritage penny cuts." },
    { id: "monks", name: "Monks", pieces: monkPieces, desc: "Classic single and double strap burnished leather monk shoes." },
    { id: "wallets", name: "Wallets", pieces: walletPieces, desc: "Bespoke ostrich leather billfolds, cardholders, and travel organizers." },
    { id: "sneakers", name: "Sneakers", pieces: sneakerPieces, desc: "Minimalist calfskin, textured suede, and premium sport runners." }
];

let allAccessoriesPieces = [];
let subCatData = [];
subCats.forEach(sc => {
    if (sc.pieces.length > 0) {
        subCatData.push(`{ id: "${sc.id}", name: "${sc.name}", count: ${sc.pieces.length}, img: ${sc.pieces[0].match(/img: ([^ ]+)/)[1]}, desc: "${sc.desc}" }`);
        const subCatPiecesMap = sc.pieces.map(p => p.slice(0, -2) + `, subcat: "${sc.id}" }`);
        allAccessoriesPieces = allAccessoriesPieces.concat(subCatPiecesMap);
    }
});

dataGen += `    accessories: {
        name: "Atelier Accessories",
        edit: "Finishing Details",
        description: "Bespoke leather bags, ostrich skin wallets, hand-crafted footwear, and detailed brooches to complete the silhouette.",
        subcategories: [
            ${subCatData.join(',\n            ')}
        ],
        pieces: [
            ${allAccessoriesPieces.join(',\n            ')}
        ]
    }\n`;
dataGen += '};\n';

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/wardrobeData.js', imports + '\n' + dataGen);
console.log('Successfully wrote src/data/wardrobeData.js');
