const { WARDROBE_DATA } = require('./src/data/wardrobeData.js');
for (const cat of Object.keys(WARDROBE_DATA)) {
    console.log(`${cat}: ${WARDROBE_DATA[cat].looks.length} looks`);
}
