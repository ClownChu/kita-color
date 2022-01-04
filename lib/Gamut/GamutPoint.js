'use strict'

class GamutPoint {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    getLinearDistanceToPoint(fromPoint) {
        return Math.hypot((fromPoint.x - this.x), (fromPoint.y - this.y))
    }

    getClosestPoint(A, B = null) {
        if (B === null) {
            B = new GamutPoint(0, 0)
        }
        
        const xy2a = new GamutPoint((this.x - A.x), (this.y - A.y))
        const a2b = new GamutPoint((A.x - B.x), (A.y - B.y))

        const a2bSqr = Math.pow(a2b[0],2) + Math.pow(a2b[1],2)

        const xy2a_dot_a2b = xy2a[0] * a2b[0] + xy2a[1] * a2b[1]
        const t = xy2a_dot_a2b / a2bSqr

        return new GamutPoint((A.x + a2b[0] * t), (A.y + a2b[1] * t))
    }
}

module.exports = {
    GamutPoint
}