'use strict'

const { Color } = require('./Color')
const { GamutPoint } = require('../Gamut/GamutPoint')

class HueYxy extends Color {
    /**
     * Constructs {@link HueYxy} color object
     * @param {int} brightness Bytes representation of the color's brightness (Values: 0 - 255)
     * @param {float} x X coordinate of color in the CIE1931 color space
     * @param {float} y Y coordinate of color in the CIE1931 color space
     */
    constructor(brightness, x, y) {
        super(`hueyxy(${brightness}, ${x}, ${y})`)
        this.name = `HueYxy`
        
        this.brightness = brightness
        this.x = x
        this.y = y
    }

    /**
     * @static Converts to {@link HueYxy} color representation.
     * @param {int} r Bytes representation of the amount of red pigments in the color (Values: 0 - 255)
     * @param {int} g Bytes representation of the amount of green pigments in the color (Values: 0 - 255)
     * @param {int} b Bytes representation of the amount of blue pigments in the color (Values: 0 - 255)
     * @returns {HueYxy} object with {@link HueYxy} representation of color
     * 
     * References: 
     * https://en.wikipedia.org/wiki/CIE_1931_color_space# - Not exactly what's going on here but helped a lot.
     * 
     * Modified matrix based on empiric experiences
     * From:
     * | X |                   | 0.04900    0.31000    0.20000 |   | R |
     * | Y | = (1 / 0.17697) * | 0.17697    0.81240    0.01063 | * | G |
     * | Z |                   | 0.00000    0.01000    0.99000 |   | B |
     * 
     * To:
     * | X |                   | 0.04900    0.31000    0.20000 |   | R |
     * | Y | = (1 / 0.17697) * | 0.17697    0.81240    0.01063 | * | G |
     * | Z |                   | 0.00088    0.01000    0.99000 |   | B |
     * 
     * Extra:
     * 
     * Converting RGB values to sRGB color space
     * Reference: https://entropymine.com/imageworsener/srgbformula/
     * sRGBv = (RGBv <= 0.04045) ? (RGBv / 12.92) : Math.pow(((RGBv + 0.055) / (1.0 + 0.055)), 2.4)
     * 
     * Use this matrix when RGB values are in the sRGB color space
     * Reference: https://www.image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
     *  | X |   | R |   | 0.4124564    0.3575761    0.1804375 |
     *  | Y | = | G | * | 0.2126729    0.7151522    0.0721750 |
     *  | Z |   | B |   | 0.0193339    0.1191920    0.9503041 |
     * 
     * Unsure when the following matrixes are to be used or if it is even valid to start with. 
     * Reference: http://brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html (various)
     * 
     * Reference: https://gist.github.com/popcorn245/30afa0f98eea1c2fd34d
     *  | X |   | R |   | 0.649926    0.103455    0.197109 |
     *  | Y | = | G | * | 0.234327    0.743075    0.022598 |
     *  | Z |   | B |   | 0.000000    0.053077    1.035763 |
     * 
     * Reference: https://gist.github.com/Kautenja/93b4e441e10b47df35745e1cafba194f
     *  | X |   | R |   | 0.664511    0.154324    0.162028 |
     *  | Y | = | G | * | 0.283881    0.668433    0.047685 |
     *  | Z |   | B |   | 0.000088    0.072310    0.986039 |
     * 
     */
    static fromRGB(r, g, b) {
        r = r / 255
        g = g / 255
        b = b / 255

        const X = r * 0.49000 * (1/0.17697) + g * 0.31000 * (1/0.17697) + b * 0.20000 * (1/0.17697)
        const Y = r * 0.17697 * (1/0.17697) + g * 0.81240 * (1/0.17697) + b * 0.01063 * (1/0.17697)
        const Z = r * 0.00088 * (1/0.17697) + g * 0.01000 * (1/0.17697) + b * 0.99000 * (1/0.17697)

        const x = (X / (X + Y + Z))
        const y = (Y / (X + Y + Z))

        return new HueYxy(
            Y,
            x,
            y
        )
    }

    /**
     * Get {@link GamutPoint} object with (x, y) coordinates of the color
     * @returns {GamutPoint} Object with (x, y) coordinates
     */
    getGamutPoint() {
        return new GamutPoint(this.x, this.y)
    }

    /**
     * Verify if {@link GamutPoint} is withing the {@link GamutRange}
     * @param {GamutRange} gamutRange Colors gamut min and max points
     * @returns {bool} `true` if is within the range
     */
	isWithinGamutRange(gamutRange) {
		let v0 = new GamutPoint((gamutRange.b[0] - gamutRange.r[0]), (gamutRange.b[1] - gamutRange.r[1]))
		let v1 = new GamutPoint((gamutRange.g[0] - gamutRange.r[0]), (gamutRange.g[1] - gamutRange.r[1]))
		let v2 = new GamutPoint((this.x - gamutRange.r[0]), (this.y - gamutRange.r[1]))

		let dot00 = (v0.x * v0.x) + (v0.y * v0.y)
		let dot01 = (v0.x * v1.x) + (v0.y * v1.y)
		let dot02 = (v0.x * v2.x) + (v0.y * v2.y)
		let dot11 = (v1.x * v1.x) + (v1.y * v1.y)
		let dot12 = (v1.x * v2.x) + (v1.y * v2.y)

		let invDenom = 1 / (dot00 * dot11 - dot01 * dot01)

		let u = (dot11 * dot02 - dot01 * dot12) * invDenom
		let v = (dot00 * dot12 - dot01 * dot02) * invDenom

		return ((u >= 0) && (v >= 0) && (u + v < 1))
	}

    /**
     * Get the closest color available within the {@link GamutRange}
     * @param {GamutRange} gamutRange Colors gamut min and max points
     * @returns {GamutPoint} Point of the closest color within the {@link GamutRange}
     */
	getClosestColor(gamutRange) {        
        const gamutPoint = this.getGamutPoint()

		const closestColorPoints = {
			rg: gamutPoint.getClosestPoint(gamutRange.r, gamutRange.g),
			gb: gamutPoint.getClosestPoint(gamutRange.g, gamutRange.b),
			br: gamutPoint.getClosestPoint(gamutRange.b, gamutRange.r)
		}

		let closestDistance = 999999
		let closestColor = null
        Object.keys(closestColorPoints).forEach((k, v) => {
            const distance = gamutPoint.getLineDistance(v)
            if(closestDistance > distance) {
                closestDistance = distance;
                closestColor = k;
            }
        })

        if (closestColor === null) {
            throw new Error(`Could not find closest color for Gamut range`)
        }

		return closestColorPoints[closestColor];
	}      
}

module.exports = {
    HueYxy
}