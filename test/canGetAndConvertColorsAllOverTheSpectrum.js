'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert;
const { KitaColor, ColorType } = require('..')

const testDefintionsContent = fs.readFileSync(path.join(__dirname, 'definitions/canGetAndConvertColorsAllOverTheSpectrum.json'))
const testDefintions = JSON.parse(testDefintionsContent)
  
testDefintions.testData.forEach((d) => {
    describe(`'KitaColor' constructed with ${d.colorType}(${d.value})`, () => {
        const color = eval(`new ColorType.${d.colorType}(${d.value})`)
        const kitaColor = new KitaColor(color)

        d.results.forEach((r) => {
            it(`Can convert to ${r.colorType}`, () => { 
                const actualResult = eval(`kitaColor.get(ColorType.${r.colorType})`)
                assert.equal(actualResult.colorString, r.value)
            })
        })
    })
})