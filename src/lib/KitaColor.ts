import { ColorTypeOf, Color, Hex, HSV, HueYxy, RGB } from './ColorType';
import { KitaConverter } from './KitaConverter';

export class KitaColor {
    private color: Color;
    public get Color() {
        return this.color;
    }

    /**
     * Constructs {@link KitaColor} object
     * @param {ColorType} color Hex/RGB/HSV/HueYxy-Lab color representation
     */
    constructor (color: Color) {
        if (
            !(color instanceof Hex)
            && !(color instanceof RGB)
            && !(color instanceof HSV)
            && !(color instanceof HueYxy)) {
            throw new Error(`${color} is not a valid "Color Type" for KitaColor`);
        }

        this.color = color;
    }

    /**
     * Get color representation of specified `colorType`
     * @param {Color} colorType Type of color representation
     * @returns {ColorType} object with {@link colorType} representation of color
     */
    get(colorType: ColorTypeOf) {
        if (colorType === Hex) {
            return KitaConverter.convertToHex(this.Color);
        } else if (colorType === HSV) {
            return KitaConverter.convertToHSV(this.Color);
        } else if (colorType === HueYxy) {
            return KitaConverter.convertToHueYxy(this.Color);
        } else if (colorType === RGB) {
            return KitaConverter.convertToRGB(this.Color);
        } else {
            throw new Error(`'${colorType}' is not a "valid type" for KitaColor`);
        }
    }
}