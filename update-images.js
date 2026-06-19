const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'travel-planner', 'mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1555881400-74d7acaacd8b\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/activities/atv-dunes.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1542408381-8b2b9ce38827\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/activities/desert-4x4-transfer.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1610488219491-0f7e4a169b1d\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/shop/fossil-stone.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1601662916669-80b6212e3e5c\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/shop/dates-gift-box.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1551882547-ff40c63fe5fa\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/erg-chebbi-golden-camp.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1520250497591-112f2f40a3f4\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/nomad-sky-luxury.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1553504107-1bcba88b7705\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/riad-tafilalet.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1566073771259-6a8506099945\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/sahara-oasis-guesthouse.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1596394516093-501ba68a0ba6\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/desert-rose-eco-lodge.png"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-1582719508461-905c673771fd\?auto=format&fit=crop&q=80&w=400"/g, '"/images/sahara/stays/kasbah-erg-chebbi.png"');

fs.writeFileSync(filePath, content);
console.log('mockData.ts updated successfully.');
