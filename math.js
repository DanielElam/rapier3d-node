"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationOps = exports.Quaternion = exports.VectorOps = exports.Vector3 = void 0;
const raw_1 = require("./raw");
/**
 * A 3D vector.
 */
class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
exports.Vector3 = Vector3;
class VectorOps {
    static new(x, y, z) {
        return new Vector3(x, y, z);
    }
    static intoRaw(v) {
        return new raw_1.RawVector(v.x, v.y, v.z);
    }
    static zeros() {
        return VectorOps.new(0.0, 0.0, 0.0);
    }
    // FIXME: type ram: RawVector?
    static fromRaw(raw) {
        if (!raw)
            return null;
        let res = VectorOps.new(raw.x, raw.y, raw.z);
        raw.free();
        return res;
    }
}
exports.VectorOps = VectorOps;
/**
 * A quaternion.
 */
class Quaternion {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
exports.Quaternion = Quaternion;
class RotationOps {
    static identity() {
        return new Quaternion(0.0, 0.0, 0.0, 1.0);
    }
    static fromRaw(raw) {
        if (!raw)
            return null;
        let res = new Quaternion(raw.x, raw.y, raw.z, raw.w);
        raw.free();
        return res;
    }
    static intoRaw(rot) {
        return new raw_1.RawRotation(rot.x, rot.y, rot.z, rot.w);
    }
}
exports.RotationOps = RotationOps;
// #endif
//# sourceMappingURL=math.js.map