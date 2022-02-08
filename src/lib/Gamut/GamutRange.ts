import { GamutPoint } from './GamutPoint';

export class GamutRange {    
    private r: GamutPoint;
    public get R() {
        return this.r;
    }

    private g: GamutPoint;
    public get G() {
        return this.g;
    }

    private b: GamutPoint;
    public get B() {
        return this.b;
    }

    constructor(r: GamutPoint, g: GamutPoint, b: GamutPoint) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Get Gamut range based on Philips Hue lights Model ID
     * @param {string} modelId Philips Hue light Model ID
     * @returns {Object} Gamut range limits
     */
    static fromPhilipsHueLightModelId(modelId: string) {
        const model = modelId.substring(0, 3).toUpperCase();
        const modelNumber = parseInt(modelId.substring(3));

        if (
            (model === `LLC` && modelNumber < 20) 
            || (model === `LST` && modelNumber === 1)
        ) {
            return GamutRange.A;
        } else if (
            (model === `LCT` && modelNumber < 10)
            || model === `LLM`
        ) {
            return GamutRange.B;
        } else if (
            (model === `LLC`)
            || (model === `LCT`)
            || (model === `LST` && modelNumber === 2)
        ) {
            return GamutRange.C;
        }

        return GamutRange.Default;
    }

    static get Default() {
        return new GamutRange(
            new GamutPoint(1.0, 0.0),
            new GamutPoint(0.0, 1.0),
            new GamutPoint(0.0, 0.0)
        );
    }

    static get A() {
        return new GamutRange(
            new GamutPoint(0.704, 0.296),
            new GamutPoint(0.2151, 0.7106),
            new GamutPoint(0.138, 0.08)
        );
    }

    static get B() {
        return new GamutRange(
            new GamutPoint(0.675, 0.322),
            new GamutPoint(0.409, 0.518),
            new GamutPoint(0.167, 0.04)
        );
    }

    static get C() {
        return new GamutRange(
            new GamutPoint(0.692, 0.308),
            new GamutPoint(0.17, 0.7),
            new GamutPoint(0.153, 0.048)
        );
    }
}