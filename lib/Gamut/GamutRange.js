'use strict'

const { GamutPoint } = require('./GamutPoint')

class GamutRange {
    /**
     * Get Gamut range based on Philips Hue lights Model ID
     * @param {string} modelId Philips Hue light Model ID
     * @returns {Object} Gamut range limits
     */
    static fromPhilipsHueLightModelId(modelId) {
        const model = modelId.substring(0, 3).toUpperCase()
        const modelNumber = parseInt(modelId.substring(3))

        if (
            (model === `LLC` && modelNumber < 20) 
            || (model === `LST` && modelNumber === 1)
        ) {
            return GamutRange.A()
        } else if (
            (model === `LCT` && modelNumber < 10)
            || model === `LLM`
        ) {
            return GamutRange.B()
        } else if (
            (model === `LLC`)
            || (model === `LCT`)
            || (model === `LST` && modelNumber === 2)
        ) {
            return GamutRange.C()
        }

        return GamutRange.Default()
    }

    static get Default() {
        return {
            r: new GamutPoint(1.0, 0.0),
            g: new GamutPoint(0.0, 1.0),
            b: new GamutPoint(0.0, 0.0)
        }
    }

    static get A() {
        return {
            r: new GamutPoint(0.704, 0.296),
            g: new GamutPoint(0.2151, 0.7106),
            b: new GamutPoint(0.138, 0.08)
        }
    }

    static get B() {
        return {
            r: new GamutPoint(0.675, 0.322),
            g: new GamutPoint(0.409, 0.518),
            b: new GamutPoint(0.167, 0.04)
        }
    }

    static get C() {
        return {
            r: new GamutPoint(0.692, 0.308),
            g: new GamutPoint(0.17, 0.7),
            b: new GamutPoint(0.153, 0.048)
        }
    }
}

module.exports = {
    GamutRange
}