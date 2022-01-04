'use strict'

const { Hex } = require('./ColorType/Hex') 
const { HSV } = require('./ColorType/HSV')
const { HueYxy } = require('./ColorType/HueYxy')
const { RGB } = require('./ColorType/RGB')

class KitaConverter {
    static convertToHex(color) {
        if (color instanceof Hex) {
            return color
        }

        let rgb = null
        if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.h, color.s, color.v)
        } else if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.brightness, color.x, color.y)
        } else if (color instanceof RGB) {
            rgb = color
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`)
        }

        return Hex.fromRGB(rgb.r, rgb.g, rgb.b)
    }

    static convertToHSV(color) {
        if (color instanceof HSV) {
            return color
        } 

        let rgb = null
        if (color instanceof Hex) {
            rgb = RGB.fromHex(color.hex)
        } else if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.brightness, color.x, color.y)
        } else if (color instanceof RGB) {
            rgb = color
        }

        return HSV.fromRGB(rgb.r, rgb.g, rgb.b)
    }

    static convertToHueYxy(color) {
        if (color instanceof HueYxy) {
            return color
        } 

        let rgb = null
        if (color instanceof Hex) {
            rgb = RGB.fromHex(color.hex)
        } else if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.h, color.s, color.v)
        } else if (color instanceof RGB) {
            rgb = color
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`)
        }

        const hsv = KitaConverter.convertToHSV(rgb)
        const hueyxy = HueYxy.fromRGB(rgb.r, rgb.g, rgb.b)

        return new HueYxy(parseInt(hsv.v * 255), hueyxy.x, hueyxy.y)
    }

    static convertToRGB(color) {
        if (color instanceof RGB) {
            return color
        } 

        let rgb = null
        if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.brightness, color.x, color.y)
        } else if (color instanceof Hex) {
            rgb = RGB.fromHex(color.hex)
        } else if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.h, color.s, color.v)
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`)
        }

        return rgb
    }
}

module.exports = {
    KitaConverter
}