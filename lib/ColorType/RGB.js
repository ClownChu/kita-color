'use strict'

const { Color } = require("./Color")
const { GamutPoint } = require("../Gamut/GamutPoint")

class RGB extends Color {
    /**
     * Constructs {@link RGB} color object
     * @param {int} r Bytes representation of the amount of red pigments in the color (Values: 0 - 255)
     * @param {int} g Bytes representation of the amount of green pigments in the color (Values: 0 - 255)
     * @param {int} b Bytes representation of the amount of blue pigments in the color (Values: 0 - 255)
     */
    constructor (r, g, b) {
        super(`rgb(${r}, ${g}, ${b})`)
        this.name = `RGB`

        this.r = r
        this.g = g
        this.b = b
    }

    /**
     * @static Converts {@link Hex} object to {@link RGB} color representation.
     * Reference: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
     * @param {string} hex Hexadecimal representation of color
     * @returns {RGB} object with {@link RGB} representation of color
     */
    static fromHex(hex) {
        let r = 0
        let g = 0
        let b = 0

        if (hex.length === 4) {
          r = parseInt(hex[1] + hex[1], 16)
          g = parseInt(hex[2] + hex[2], 16)
          b = parseInt(hex[3] + hex[3], 16)
        } else if (hex.length === 7) {
          r = parseInt(hex[1] + hex[2], 16)
          g = parseInt(hex[3] + hex[4], 16)
          b = parseInt(hex[5] + hex[6], 16)
        } else {
            throw new Error(`Invalid Hex? '${hex}' cannot be converted to RGB`)
        }
        
        return new RGB(r, g, b)
    }

    /**
     * @static Converts {@link HSV} object to {@link RGB} color representation.
     * Reference: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
     * @param {float} h Color hue value representation in degrees (Values: 0 - 360)
     * @param {float} s Color saturation value representation (Values: 0 - 1)
     * @param {float} v Color brightness value representation (Values: 0 - 1)
     * @returns {RGB} object with {@link RGB} representation of color
     */
    static fromHSV(h, s, v) {
        h = h / 360
        const i = Math.floor(h * 6)
        const f = h * 6 - i
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)

        let r = 0
        let g = 0
        let b = 0
        switch (i % 6) {
            case 0: 
                r = v
                g = t
                b = p
                break
            case 1:
                r = q
                g = v 
                b = p
                break
            case 2: 
                r = p
                g = v
                b = t
                break
            case 3: 
                r = p 
                g = q 
                b = v
                break
            case 4: 
                r = t 
                g = p 
                b = v
                break
            case 5: 
                r = v
                g = p 
                b = q
                break
            default:
                throw new Error(`Invalid HSV? '${arguments.join(`, `)}' cannot be converted to RGB`)
        }

        return new RGB(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        )
    }

    /**
     * @static Converts {@link HueYxy} object to {@link RGB} color representation.
     * Reference: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
     * @param {int} brightness Bytes representation of the color's brightness (Values: 0 - 255)
     * @param {float} x X coordinate of color in the CIE1931 color space
     * @param {float} y Y coordinate of color in the CIE1931 color space
     * @returns {RGB} object with {@link RGB} representation of color
     * 
     * Reference: https://en.wikipedia.org/wiki/CIE_1931_color_space#
     * 
     * Should use the inverse of the matrix:
     * | X |                   | 0.04900    0.31000    0.20000 |   | R |
     * | Y | = (1 / 0.17697) * | 0.17697    0.81240    0.01063 | * | G |
     * | Z |                   | 0.00088    0.01000    0.99000 |   | B |
     * 
     * In this case:
     * 
     *  | R |   | X |   |  0.4184657124218950    -0.1586607848037990    -0.0828349276180955 |
     *  | G | = | Y | * | -0.0911689639090227     0.2524314421394650     0.0157075217695576 |
     *  | B |   | Z |   |  0.0005491061132860    -0.0025498125468633     0.1785989139215200 |
     * 
     * 
     * Extra:
     * 
     * Converting RGB values to sRGB color space
     * Reference: https://entropymine.com/imageworsener/srgbformula/
     * RGBv = (sRGBv  <= 0.0031308) ? (sRGBv * 12.92) : Math.pow(sRGBv, (1.0 / 2.4)) * (1.0 + 0.055) - 0.055
     * 
     * Use this matrix when Yxy values are in the sRGB color space
     * Reference: https://dspace.library.uu.nl/bitstream/handle/1874/8088/appc.pdf
     *  | R |   | X |   |  3.2407689528637400    -1.5377468218999200    -0.4985450142346280 |
     *  | G | = | Y | * | -0.9693603467160290     1.8761927819029300     0.0415601106285127 |
     *  | B |   | Z |   |  0.0556488134566657    -0.2040362940459200     1.0572249312032600 |
     * 
     * This matrix is the inverse of:
     * 
     *  | X |   | R |   | 0.4124564    0.3575761    0.1804375 |
     *  | Y | = | G | * | 0.2126729    0.7151522    0.0721750 |
     *  | Z |   | B |   | 0.0193339    0.1191920    0.9503041 |
     * 
     * Unsure when the following matrixes are to be used or if it is even valid to start with. 
     * 
     * Reference: https://gist.github.com/Kautenja/93b4e441e10b47df35745e1cafba194f
     *  | R |   | X |   |  1.656492    -0.354851    0.255038 |
     *  | G | = | Y | * | -0.707196     1.655397    0.036152 |
     *  | B |   | Z |   |  0.051713    -0.121364    1.011530 |
     * 
     */
    static fromHueYxy(brightness, x, y) {
		let point = new GamutPoint(x, y)

		const Y = brightness / 255
		const X = (Y / point.y) * point.x
		const Z = (Y / point.y) * (1.0 - point.x - point.y)


        let r = Math.abs( X * 0.4184657124218950 - Y * 0.1586607848037990 - Z * 0.0828349276180955)
        let g = Math.abs(-X * 0.0911689639090227 + Y * 0.2524314421394650 + Z * 0.0157075217695576)
        let b = Math.abs( X * 0.0005491061132860 - Y * 0.0025498125468633 + Z * 0.1785989139215200)

        if (r > b && r > g) {
            g = g / r
            b = b / r

            r = 1.0
        } else if (g > r && g > b) {
            r = r / g
            b = b / g 

            g = 1.0 
        } else if (b > r && b > g) {
            r = r / b
            g = g / b
            
            b = 1.0
        }

        r = Math.min(r, 1.0)
        g = Math.min(g, 1.0)
        b = Math.min(b, 1.0)

        return new RGB(
            Math.round(r * 255 * Y),
            Math.round(g * 255 * Y), 
            Math.round(b * 255 * Y)
        )
    }
}

module.exports = {
    RGB
}