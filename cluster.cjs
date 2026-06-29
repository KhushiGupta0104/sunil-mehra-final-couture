const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync('all_photos.txt', 'utf8').split('\n').filter(Boolean);

const shoots = [];

lines.forEach(line => {
    const parts = line.split('/');
    const filename = parts.pop();
    const dir = parts.join('/');
    
    // Better base extraction
    // "Sunil Mehra  1474 - Copy.jpg" -> base: "Sunil Mehra", num: 1474
    // "066A0014.jpg" -> base: "066A", num: 14
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
            nums: num !== null ? [num] : [],
            photos: [filename]
        });
    }
});

console.log(`Clustered ${lines.length} photos into ${shoots.length} shoots.`);
// count number of photos in each shoot
const distribution = shoots.map(s => s.photos.length);
console.log(`Distribution of photos per shoot:`, distribution.slice(0, 50));
