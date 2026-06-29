const fs = require('fs');
const content = fs.readFileSync('src/data/wardrobeData.js', 'utf8');

const regex = /"([^"]+)": \{[\s\S]*?looks: \[([\s\S]*?)\]\n    \},/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const cat = match[1];
    const looksBlock = match[2];
    const count = (looksBlock.match(/id: "look_/g) || []).length;
    console.log(`${cat}: ${count}`);
}
