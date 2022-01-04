'use strict'

const { KitaColor, ColorType } = require('..')

const hexColor = new ColorType.Hex(`#ffffff`)
let kitaColor = new KitaColor(hexColor)

console.log(`HueYxy: ${JSON.stringify(kitaColor.get(ColorType.HueYxy))}`)
console.log(`Hex: ${JSON.stringify(kitaColor.get(ColorType.Hex))}`)
console.log(`HSV: ${JSON.stringify(kitaColor.get(ColorType.HSV))}`)
console.log(`RGB: ${JSON.stringify(kitaColor.get(ColorType.RGB))}`)

const hsvColor = new ColorType.HSV(0, 1, 0.4392156862745098)
kitaColor = new KitaColor(hsvColor)

console.log()
console.log(`HueYxy: ${JSON.stringify(kitaColor.get(ColorType.HueYxy))}`)
console.log(`Hex: ${JSON.stringify(kitaColor.get(ColorType.Hex))}`)
console.log(`HSV: ${JSON.stringify(kitaColor.get(ColorType.HSV))}`)
console.log(`RGB: ${JSON.stringify(kitaColor.get(ColorType.RGB))}`)

const HueYxyColor = new ColorType.HueYxy(138, 0.35801350456865766, 0.25814576216311497)
kitaColor = new KitaColor(HueYxyColor)

console.log()
console.log(`HueYxy: ${JSON.stringify(kitaColor.get(ColorType.HueYxy))}`)
console.log(`Hex: ${JSON.stringify(kitaColor.get(ColorType.Hex))}`)
console.log(`HSV: ${JSON.stringify(kitaColor.get(ColorType.HSV))}`)
console.log(`RGB: ${JSON.stringify(kitaColor.get(ColorType.RGB))}`)