const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'travel-planner', 'mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\/images\/sahara\/shop\/desert-cheche\.png/g, '/images/sahara/shop/desert-cheche.jpg');
content = content.replace(/\/images\/sahara\/shop\/dates-gift-box\.png/g, '/images/sahara/shop/dates-gift-box.jpg');
content = content.replace(/\/images\/sahara\/shop\/fossil-stone\.png/g, '/images/sahara/shop/fossil-stone.jpg');
content = content.replace(/\/images\/sahara\/shop\/leather-pouch\.png/g, '/images/sahara/shop/leather-pouch.jpg');
content = content.replace(/\/images\/sahara\/shop\/moroccan-tea-set\.png/g, '/images/sahara/shop/moroccan-tea-set.jpg');

fs.writeFileSync(filePath, content);
console.log("mockData.ts updated with new jpg references!");
