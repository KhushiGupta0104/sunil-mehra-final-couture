const fs = require('fs');
const content = fs.readFileSync('src/data/wardrobeData.js', 'utf8');
const cats = ["winter-collection", "accessories", "bandhagala-indo-western", "jawahar-jackets", "suits", "kurta-sets"];
for (const cat of cats) {
   const re = new RegExp(`"${cat}":\\s*\\{[\\s\\S]*?looks:\\s*\\[([\\s\\S]*?)\\]\\s*\\}`, 'm');
   const match = content.match(re);
   if (match) {
       const looksBlock = match[1];
       const count = (looksBlock.match(/coverImg:/g) || []).length;
       console.log(`${cat}: ${count} looks`);
   }
}
