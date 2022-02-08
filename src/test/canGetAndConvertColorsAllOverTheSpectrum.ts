import * as fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import * as k from '..'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { TestDefintions } from 'types';


const testDefintionsContent = fs.readFileSync(path.join(__dirname, `definitions`, `canGetAndConvertColorsAllOverTheSpectrum.json`), `utf-8`);
const testDefintions: TestDefintions = JSON.parse(testDefintionsContent);
  
testDefintions.testData.forEach((d) => {
    describe(`'KitaColor' constructed with ${d.colorType}(${d.value})`, () => {
        const color = eval(`new k.${d.colorType}(${d.value})`);
        const kitaColor = new k.KitaColor(color); // eslint-disable-line @typescript-eslint/no-unused-vars

        d.results.forEach((r) => {
            it(`Can convert to ${r.colorType}`, () => { 
                const actualResult = eval(`kitaColor.get(k.${r.colorType})`);
                assert.equal(actualResult.colorString, r.value);
            });
        });
    });
});