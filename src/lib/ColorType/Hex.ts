import { Color } from './Color';

export class Hex extends Color {
    private hex: string;
    public get Hex() {
        return this.hex;
    }

    /**
     * Constructs {@link Hex} color object
     * @param {string} hex Hex code
     */
    constructor (hex: string) {
        if (!hex.startsWith(`#`)) {
            hex = `#${hex}`;
        }

        super(hex, `Hex`);
        this.hex = hex;
    }

    static fromRGB(r: number, g: number, b: number) {
        let R = r.toString(16);
        let G = g.toString(16);
        let B = b.toString(16);
      
        if (R.length === 1) {
            R = `0${r}`;
        }

        if (G.length === 1) {
            G = `0${g}`;
        }

        if (B.length === 1) {
            B = `0${b}`;
        }
      
        return new Hex(`${R}${G}${B}`);
    }
}