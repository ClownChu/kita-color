export class Color {
    protected name: string;
    public get Name() {
        return this.name;
    }

    protected colorString: string;
    public get ColorString() {
        return this.colorString;
    }

    constructor(colorString: string, name: string) {
        this.name = name;
        this.colorString = colorString;
    }
}