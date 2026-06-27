const fs = require('fs');
const path = require('path');

// Function to recursively find all .jsx files
function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith('.jsx')) {
        files.push(name);
      }
    }
  }
  return files;
}

const allFiles = getFiles(path.join(__dirname, 'src'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  content = content.replace(/from\s+['"]\.\.\/data\/wardrobeData['"]/g, 'from "@/data/wardrobeData"');
  content = content.replace(/from\s+['"]\.\.\/assets\//g, 'from "@/assets/');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated assets/data imports in ${file}`);
  }
});
