"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RayColliderToi = exports.RayColliderIntersection = exports.Ray = void 0;
const math_1 = require("../math");
/**
 * A ray. This is a directed half-line.
 */
class Ray {
    /**
     * Builds a ray from its origin and direction.
     *
     * @param origin - The ray's starting point.
     * @param dir - The ray's direction of propagation.
     */
    constructor(origin, dir) {
        this.origin = origin;
        this.dir = dir;
    }
    pointAt(t) {
        return {
            x: this.origin.x + this.dir.x * t,
            y: this.origin.y + this.dir.y * t,
            // #if DIM3
            z: this.origin.z + this.dir.z * t,
            // #endif
        };
    }
    ;
}
exports.Ray = Ray;
/**
 * The intersection between a ray and a collider.
 */
class RayColliderIntersection {
    constructor(colliderHandle, toi, normal) {
        this.colliderHandle = colliderHandle;
        this.toi = toi;
        this.normal = normal;
    }
    static fromRaw(raw) {
        if (!raw)
            return null;
        const result = new RayColliderIntersection(raw.colliderHandle(), raw.toi(), math_1.VectorOps.fromRaw(raw.normal()));
        raw.free();
        return result;
    }
}
exports.RayColliderIntersection = RayColliderIntersection;
/**
 * The time of impact between a ray and a collider.
 */
class RayColliderToi {
    constructor(colliderHandle, toi) {
        this.colliderHandle = colliderHandle;
        this.toi = toi;
    }
    static fromRaw(raw) {
        if (!raw)
            return null;
        const result = new RayColliderToi(raw.colliderHandle(), raw.toi());
        raw.free();
        return result;
    }
}
exports.RayColliderToi = RayColliderToi;
//# sourceMappingURL=ray.js.map