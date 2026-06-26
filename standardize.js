import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            walk(path.join(dir, file), fileList);
        } else if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const allFiles = walk('./src');
let replacedCount = 0;

for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    
    let newContent = content;
    
    // Replace --cream with --bone
    newContent = newContent.replace(/var\(--cream\)/g, 'var(--bone)');
    
    // Check if anything changed
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
        replacedCount++;
    }
}

console.log(`Replaced --cream with --bone in ${replacedCount} files.`);
