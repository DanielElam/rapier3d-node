"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBodySet = void 0;
const raw_1 = require("../raw");
const math_1 = require("../math");
const rigid_body_1 = require("./rigid_body");
/**
 * A set of rigid bodies that can be handled by a physics pipeline.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `jointSet.free()`
 * once you are done using it (and all the rigid-bodies it created).
 */
class RigidBodySet {
    constructor(raw) {
        this.raw = raw || new raw_1.RawRigidBodySet();
    }
    /**
     * Release the WASM memory occupied by this rigid-body set.
     */
    free() {
        this.raw.free();
        this.raw = undefined;
    }
    /**
     * Creates a new rigid-body and return its integer handle.
     *
     * @param desc - The description of the rigid-body to create.
     */
    createRigidBody(desc) {
        let rawTra = math_1.VectorOps.intoRaw(desc.translation);
        let rawRot = math_1.RotationOps.intoRaw(desc.rotation);
        let rawLv = math_1.VectorOps.intoRaw(desc.linvel);
        let rawCom = math_1.VectorOps.intoRaw(desc.centerOfMass);
        // #if DIM3
        let rawAv = math_1.VectorOps.intoRaw(desc.angvel);
        let rawPrincipalInertia = math_1.VectorOps.intoRaw(desc.principalAngularInertia);
        let rawInertiaFrame = math_1.RotationOps.intoRaw(desc.angularInertiaLocalFrame);
        // #endif
        let handle = this.raw.createRigidBody(rawTra, rawRot, desc.gravityScale, desc.mass, desc.translationsEnabled, rawCom, rawLv, 
        // #if DIM3
        rawAv, rawPrincipalInertia, rawInertiaFrame, desc.rotationsEnabledX, desc.rotationsEnabledY, desc.rotationsEnabledZ, 
        // #endif
        desc.linearDamping, desc.angularDamping, desc.status, desc.canSleep, desc.ccdEnabled, desc.dominanceGroup);
        rawTra.free();
        rawRot.free();
        rawLv.free();
        rawCom.free();
        // #if DIM3
        rawAv.free();
        rawPrincipalInertia.free();
        rawInertiaFrame.free();
        // #endif
        return handle;
    }
    /**
     * Removes a rigid-body from this set.
     *
     * This will also remove all the colliders and joints attached to the rigid-body.
     *
     * @param handle - The integer handle of the rigid-body to remove.
     * @param colliders - The set of colliders that may contain colliders attached to the removed rigid-body.
     * @param joints - The set of joints that may contain joints attached to the removed rigid-body.
     */
    remove(handle, islands, colliders, joints) {
        this.raw.remove(handle, islands.raw, colliders.raw, joints.raw);
    }
    /**
     * The number of rigid-bodies on this set.
     */
    len() {
        return this.raw.len();
    }
    /**
     * Does this set contain a rigid-body with the given handle?
     *
     * @param handle - The rigid-body handle to check.
     */
    contains(handle) {
        return this.raw.contains(handle);
    }
    /**
     * Gets the rigid-body with the given handle.
     *
     * @param handle - The handle of the rigid-body to retrieve.
     */
    get(handle) {
        if (this.raw.contains(handle)) {
            return new rigid_body_1.RigidBody(this.raw, handle);
        }
        else {
            return null;
        }
    }
    /**
     * Applies the given closure to each rigid-body contained by this set.
     *
     * @param f - The closure to apply.
     */
    forEachRigidBody(f) {
        this.forEachRigidBodyHandle((handle) => {
            f(new rigid_body_1.RigidBody(this.raw, handle));
        });
    }
    /**
     * Applies the given closure to the handle of each rigid-body contained by this set.
     *
     * @param f - The closure to apply.
     */
    forEachRigidBodyHandle(f) {
        this.raw.forEachRigidBodyHandle(f);
    }
    /**
     * Applies the given closure to each active rigid-bodies contained by this set.
     *
     * A rigid-body is active if it is not sleeping, i.e., if it moved recently.
     *
     * @param f - The closure to apply.
     */
    forEachActiveRigidBody(islands, f) {
        islands.forEachActiveRigidBodyHandle((handle) => {
            f(new rigid_body_1.RigidBody(this.raw, handle));
        });
    }
}
exports.RigidBodySet = RigidBodySet;
//# sourceMappingURL=rigid_body_set.js.map