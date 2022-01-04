'use strict'

const { Color } = require("./Color")

class Hex extends Color {
    /**
     * Constructs {@link Hex} color object
     * @param {string} hex Hex code
     */
    constructor (hex) {
        if (!hex.startsWith('#')) {
            hex = `#${hex}`
        }

        super(hex)
        this.name = `Hex`

        this.hex = hex
    }

    static fromRGB(r, g, b) {
        r = r.toString(16)
        g = g.toString(16)
        b = b.toString(16)
      
        if (r.length === 1) {
            r = `0${r}`
        }

        if (g.length === 1) {
            g = `0${g}`
        }

        if (b.length === 1) {
            b = `0${b}`
        }
      
        return new Hex(`${r}${g}${b}`)
    }
}

module.exports = {
    Hex
}