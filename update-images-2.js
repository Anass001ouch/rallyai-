const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'travel-planner', 'mockData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const hotelImageReplacements = [
  { name: 'Sahara Pearl Desert Camp', img: '/images/sahara/stays/sahara-pearl-camp.png' },
  { name: 'Erg Chebbi Golden Camp', img: '/images/sahara/stays/erg-chebbi-golden-camp.png' },
  { name: 'Nomad Sky Luxury Tents', img: '/images/sahara/stays/nomad-sky-luxury.png' },
  { name: 'Riad Tafilalet Dunes', img: '/images/sahara/stays/riad-tafilalet.png' },
  { name: 'Sahara Oasis Guesthouse', img: '/images/sahara/stays/sahara-oasis-guesthouse.png' },
  { name: 'Desert Rose Eco Lodge', img: '/images/sahara/stays/desert-rose-eco-lodge.png' },
  { name: 'Kasbah Erg Chebbi View', img: '/images/sahara/stays/kasbah-erg-chebbi.png' },
  { name: 'Amazigh Luxury Camp', img: '/images/sahara/stays/amazigh-luxury-camp.png' },
  { name: 'Riad Dunes Nomad', img: '/images/sahara/stays/riad-dunes-nomad.png' }
];

hotelImageReplacements.forEach(rep => {
  const regex = new RegExp(`(name|title):\\s*"${rep.name}"[\\s\\S]*?(?:image|images):\\s*(?:\\[\\s*)?"([^"]+)"`, 'g');
  content = content.replace(regex, (match, p1, p2) => {
      return match.replace(p2, rep.img);
  });
});

const activityReplacements = [
  { name: 'Sunset Camel Trekking', img: '/images/sahara/activities/camel-trekking-sunset.png' },
  { name: 'ATV Dunes Adventure', img: '/images/sahara/activities/atv-dunes.png' },
  { name: 'Sandboarding Experience', img: '/images/sahara/activities/sandboarding.png' },
  { name: 'Stargazing Desert Night', img: '/images/sahara/activities/stargazing-camp.png' },
  { name: 'Nomad Cultural Visit', img: '/images/sahara/activities/nomad-cultural-visit.png' },
  { name: '4x4 Desert Camp Pickup', img: '/images/sahara/activities/desert-4x4-transfer.png' },
  { name: 'Errachidia Airport Desert Transfer', img: '/images/sahara/activities/desert-4x4-transfer.png' }
];

activityReplacements.forEach(rep => {
  const regex = new RegExp(`(name|title):\\s*"${rep.name}"[\\s\\S]*?(?:image|images):\\s*(?:\\[\\s*)?"([^"]+)"`, 'g');
  content = content.replace(regex, (match, p1, p2) => {
      return match.replace(p2, rep.img);
  });
});

const shopReplacements = [
  { name: 'Authentic Desert Cheche', img: '/images/sahara/shop/desert-cheche.png' },
  { name: 'Tuareg Desert Cheche', img: '/images/sahara/shop/desert-cheche.png' },
  { name: 'Amazigh Silver Bracelet', img: '/images/sahara/shop/amazigh-jewelry.png' },
  { name: 'Fossil Stone Decoration', img: '/images/sahara/shop/fossil-stone.png' },
  { name: 'Erfoud Ammonite Fossil', img: '/images/sahara/shop/fossil-stone.png' },
  { name: 'Handmade Leather Travel Pouch', img: '/images/sahara/shop/leather-pouch.png' },
  { name: 'Moroccan Tea Set', img: '/images/sahara/shop/moroccan-tea-set.png' },
  { name: 'Premium Dates Gift Box', img: '/images/sahara/shop/dates-gift-box.png' },
  { name: 'Medjool Dates Gift Box', img: '/images/sahara/shop/dates-gift-box.png' }
];

shopReplacements.forEach(rep => {
  const regex = new RegExp(`(name|title):\\s*"${rep.name}"[\\s\\S]*?(?:image|images):\\s*(?:\\[\\s*)?"([^"]+)"`, 'g');
  content = content.replace(regex, (match, p1, p2) => {
      return match.replace(p2, rep.img);
  });
});

fs.writeFileSync(filePath, content);
console.log("mockData.ts successfully updated with unique paths!");
