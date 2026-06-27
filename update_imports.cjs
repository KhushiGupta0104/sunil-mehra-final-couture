const fs = require('fs');
const path = require('path');

const fileMap = {
  // Pages
  'AdminDashboard': '@/pages/AdminDashboard',
  'BookingWizard': '@/pages/BookingWizard',
  'Wardrobe': '@/pages/Wardrobe',
  'WardrobeCategoryDetail': '@/pages/WardrobeCategoryDetail',
  'Atelier': '@/pages/Atelier',
  'Gallery': '@/pages/Gallery',
  'Editorial': '@/pages/Editorial',
  'Terms': '@/pages/Terms',
  'Privacy': '@/pages/Privacy',
  'Faq': '@/pages/Faq',
  'Home': '@/pages/Home',
  'PageLayout': '@/components/layout/PageLayout',
  
  // Layout
  'Navbar': '@/components/layout/Navbar',
  'Footer': '@/components/layout/Footer',
  'OverlayMenu': '@/components/layout/OverlayMenu',
  'SearchOverlay': '@/components/layout/SearchOverlay',

  // UI
  'ScrollReveal': '@/components/ui/ScrollReveal',
  'Marquee': '@/components/ui/Marquee',
  'SectionDivider': '@/components/ui/SectionDivider',
  'PageLoader': '@/components/ui/PageLoader',
  'PageTransition': '@/components/ui/PageTransition',

  // Sections
  'Hero': '@/components/sections/Hero',
  'Featured': '@/components/sections/Featured',
  'Designer': '@/components/sections/Designer',
  'Manifesto': '@/components/sections/Manifesto',
  'Salons': '@/components/sections/Salons',
  'BespokeJourney': '@/components/sections/BespokeJourney',

  // Shared
  'HorizontalCategories': '@/components/shared/HorizontalCategories',
  'HorizontalMediaScroll': '@/components/shared/HorizontalMediaScroll',
  'HorizontalRunway': '@/components/shared/HorizontalRunway',
  'CinematicCanvas': '@/components/shared/CinematicCanvas',
  'CinematicWideReel': '@/components/shared/CinematicWideReel',
  'VerticalVideoTriptych': '@/components/shared/VerticalVideoTriptych',
  'CampaignReel': '@/components/shared/CampaignReel',

  // Wardrobe
  'LookbookGrid': '@/components/wardrobe/LookbookGrid',
  'AtelierShowcase': '@/components/wardrobe/AtelierShowcase',
  'OccasionEdit': '@/components/wardrobe/OccasionEdit',

  // Booking
  'AppointmentForm': '@/components/booking/AppointmentForm',
};

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

  // For each mapping, replace old imports with new absolute alias
  Object.keys(fileMap).forEach(component => {
    // Replace: import X from "./Component"
    // Replace: import X from "../components/Component"
    // Replace: import X from "@/components/Component"
    const regex1 = new RegExp(`from\\s+['"]\\.\\/${component}['"]`, 'g');
    const regex2 = new RegExp(`from\\s+['"]\\.\\.\\/components\\/${component}['"]`, 'g');
    const regex3 = new RegExp(`from\\s+['"]@\\/components\\/${component}['"]`, 'g');
    const regex4 = new RegExp(`from\\s+['"]\\.\\.\\/${component}['"]`, 'g');
    
    content = content.replace(regex1, `from "${fileMap[component]}"`);
    content = content.replace(regex2, `from "${fileMap[component]}"`);
    content = content.replace(regex3, `from "${fileMap[component]}"`);
    content = content.replace(regex4, `from "${fileMap[component]}"`);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
});
