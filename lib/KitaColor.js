'use strict'

const { Color } = require('./ColorType/Color')

const { HueYxy } = require('./ColorType/HueYxy')
const { Hex } = require('./ColorType/Hex') 
const { HSV } = require('./ColorType/HSV')
const { RGB } = require('./ColorType/RGB')
const { KitaConverter } = require('./KitaConverter')

class KitaColor {
    /**
     * Constructs {@link KitaColor} object
     * @param {Hex|RGB|HSV|HueYxy} color Hex/RGB/HSV/HueYxy-Lab color representation
     */
    constructor (color) {
        if (
            !(color instanceof Hex)
            && !(color instanceof RGB)
            && !(color instanceof HSV)
            && !(color instanceof HueYxy)) {
            throw new Error(`${color} is not a valid "Color Type" for KitaColor`)
        }

        this.color = color
    }

    /**
     * Get color representation of specified `colorType`
     * @param {Color} colorType Type of color representation
     * @returns {Hex|RGB|HSV|HueYxy} object with {@link colorType} representation of color
     */
    get(colorType) {
        if (typeof colorType === 'string') {
            colorType = KitaColor.getColorTypeByName(colorType)
        }

        if (colorType === Hex) {
            return KitaConverter.convertToHex(this.color)
        } else if (colorType === HSV) {
            return KitaConverter.convertToHSV(this.color)
        } else if (colorType === HueYxy) {
            return KitaConverter.convertToHueYxy(this.color)
        } else if (colorType === RGB) {
            return KitaConverter.convertToRGB(this.color)
        } else {
            throw new Error(`${colorType.name} is not a "valid type" for KitaColor`)
        }
    }

    static getColorTypeByName(colorTypeName) {
        let colorType = null
        switch (colorTypeName.toLowerCase()) {
            case "hueyxy":
                colorType = HueYxy
            break
            case "hex":
                colorType = Hex
            break
            case "hsv":
                colorType = HSV
            break
            case "rgb":
                colorType = RGB
            break
        }

        return colorType
    }
}

module.exports = {
    KitaColor,
    ColorType: {
        Color,
        HueYxy,
        Hex,
        HSV,
        RGB
    }
}