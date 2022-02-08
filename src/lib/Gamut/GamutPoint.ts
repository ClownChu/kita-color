export class GamutPoint {    
    private x: number;
    public get X() {
        return this.x;
    }

    private y: number;
    public get Y() {
        return this.y;
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    getLinearDistanceToPoint(fromPoint: GamutPoint) {
        return Math.hypot((fromPoint.X - this.X), (fromPoint.Y - this.Y));
    }

    getClosestPoint(A: GamutPoint, B?: GamutPoint) {
        if (B === undefined) {
            B = new GamutPoint(0, 0);
        }
        
        const xy2a = new GamutPoint((this.X - A.X), (this.Y - A.Y));
        const a2b = new GamutPoint((A.X - B.X), (A.Y - B.Y));

        const a2bSqr = Math.pow(a2b.X, 2) + Math.pow(a2b.Y, 2);

        const xy2a_dot_a2b = xy2a.X * a2b.X + xy2a.Y * a2b.Y;
        const t = xy2a_dot_a2b / a2bSqr;

        return new GamutPoint((A.X + a2b.X * t), (A.Y + a2b.Y * t));
    }
}