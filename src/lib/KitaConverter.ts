import { Color, Hex, HSV, HueYxy, RGB } from './ColorType';

export class KitaConverter {
    static convertToHex(color: Color) {
        if (color instanceof Hex) {
            return color;
        }

        let rgb = null;
        if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.H, color.S, color.V);
        } else if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.Brightness, color.X, color.Y);
        } else if (color instanceof RGB) {
            rgb = color;
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`);
        }

        return Hex.fromRGB(rgb.R, rgb.G, rgb.B);
    }

    static convertToHSV(color: Color) {
        if (color instanceof HSV) {
            return color;
        } 

        let rgb: RGB = new RGB(0, 0, 0);
        if (color instanceof Hex) {
            rgb = RGB.fromHex(color.Hex);
        } else if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.Brightness, color.X, color.Y);
        } else if (color instanceof RGB) {
            rgb = color;
        }
        
        return HSV.fromRGB(rgb.R, rgb.G, rgb.B);
    }

    static convertToHueYxy(color: Color) {
        if (color instanceof HueYxy) {
            return color;
        } 

        let rgb: RGB = new RGB(0, 0, 0);
        if (color instanceof Hex) {
            rgb = RGB.fromHex(color.Hex);
        } else if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.H, color.S, color.V);
        } else if (color instanceof RGB) {
            rgb = color;
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`);
        }

        const hsv = KitaConverter.convertToHSV(rgb);
        const hueyxy = HueYxy.fromRGB(rgb.R, rgb.G, rgb.B);

        return new HueYxy(hsv.V * 255, hueyxy.X, hueyxy.Y);
    }

    static convertToRGB(color: Color) {
        if (color instanceof RGB) {
            return color;
        } 

        let rgb = null;
        if (color instanceof HueYxy) {
            rgb = RGB.fromHueYxy(color.Brightness, color.X, color.Y);
        } else if (color instanceof Hex) {
            rgb = RGB.fromHex(color.Hex);
        } else if (color instanceof HSV) {
            rgb = RGB.fromHSV(color.H, color.S, color.V);
        } else {
            throw new Error(`${JSON.stringify(color)} is not a "valid color" for KitaConverter`);
        }

        return rgb;
    }
}