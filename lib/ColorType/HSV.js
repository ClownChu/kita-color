'use strict'

const { Color } = require("./Color")

class HSV extends Color {
    /**
     * Constructs {@link KitaColorHSV} object
     * @param {int} h value 0 - 360
     * @param {int} s value 0 - 100
     * @param {int} v value 0 - 100
     */
    constructor (h, s, v) {
        super(`hsv(${h}, ${s}, ${v})`)
        this.name = `HSV`

        this.h = h
        this.s = s
        this.v = v
    }

    /**
     * Converts to HSV color representation.
     * @returns {KitaColorHSV} object with HSV representation of color
     * 
     */
    static fromRGB(r, g, b) {
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min
        const saturation = (max === 0 ? 0 : delta / max)
        const value = max / 255
    
        let hue = 0
        switch (max) {
            case min:
                hue = 0
                break
            case r: 
                hue = (g - b) + (delta * (g < b ? 6: 0))
                hue /= 6 * delta
                break
            case g: 
                hue = (b - r) + (delta * 2)
                hue /= 6 * delta 
                break
            case b: 
                hue = (r - g) + (delta * 4)
                hue /= 6 * delta
                break
        }
    
        return new HSV(hue * 360, saturation, value)
    }
}

module.exports = {
    HSV
}