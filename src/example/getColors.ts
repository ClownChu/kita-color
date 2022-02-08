import { KitaColor, Hex, HSV, HueYxy, RGB } from '..';

const hexColor = new Hex(`#ffffff`);
let kitaColor = new KitaColor(hexColor);

console.log(`HueYxy: ${JSON.stringify(kitaColor.get(HueYxy))}`);
console.log(`Hex: ${JSON.stringify(kitaColor.get(Hex))}`);
console.log(`HSV: ${JSON.stringify(kitaColor.get(HSV))}`);
console.log(`RGB: ${JSON.stringify(kitaColor.get(RGB))}`);

const hsvColor = new HSV(0, 1, 0.4392156862745098);
kitaColor = new KitaColor(hsvColor);

console.log();
console.log(`HueYxy: ${JSON.stringify(kitaColor.get(HueYxy))}`);
console.log(`Hex: ${JSON.stringify(kitaColor.get(Hex))}`);
console.log(`HSV: ${JSON.stringify(kitaColor.get(HSV))}`);
console.log(`RGB: ${JSON.stringify(kitaColor.get(RGB))}`);

const HueYxyColor = new HueYxy(138, 0.35801350456865766, 0.25814576216311497);
kitaColor = new KitaColor(HueYxyColor);

console.log();
console.log(`HueYxy: ${JSON.stringify(kitaColor.get(HueYxy))}`);
console.log(`Hex: ${JSON.stringify(kitaColor.get(Hex))}`);
console.log(`HSV: ${JSON.stringify(kitaColor.get(HSV))}`);
console.log(`RGB: ${JSON.stringify(kitaColor.get(RGB))}`);