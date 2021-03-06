"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderSet = void 0;
const raw_1 = require("../raw");
const math_1 = require("../math");
const collider_1 = require("./collider");
/**
 * A set of rigid bodies that can be handled by a physics pipeline.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `colliderSet.free()`
 * once you are done using it (and all the rigid-bodies it created).
 */
class ColliderSet {
    constructor(raw) {
        this.raw = raw || new raw_1.RawColliderSet();
    }
    /**
     * Release the WASM memory occupied by this collider set.
     */
    free() {
        this.raw.free();
        this.raw = undefined;
    }
    /**
     * Creates a new collider and return its integer handle.
     *
     * @param bodies - The set of bodies where the collider's parent can be found.
     * @param desc - The collider's description.
     * @param parentHandle - The inteer handle of the rigid-body this collider is attached to.
     */
    createCollider(bodies, desc, parentHandle) {
        let hasParent = parentHandle != undefined && parentHandle != null;
        if (hasParent && isNaN(parentHandle))
            throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");
        let rawShape = desc.shape.intoRaw();
        let rawTra = math_1.VectorOps.intoRaw(desc.translation);
        let rawRot = math_1.RotationOps.intoRaw(desc.rotation);
        let rawCom = math_1.VectorOps.intoRaw(desc.centerOfMass);
        // #if DIM3
        let rawPrincipalInertia = math_1.VectorOps.intoRaw(desc.principalAngularInertia);
        let rawInertiaFrame = math_1.RotationOps.intoRaw(desc.angularInertiaLocalFrame);
        // #endif
        let handle = this.raw.createCollider(rawShape, rawTra, rawRot, desc.useMassProps, desc.mass, rawCom, 
        // #if DIM3
        rawPrincipalInertia, rawInertiaFrame, 
        // #endif
        desc.density, desc.friction, desc.restitution, desc.frictionCombineRule, desc.restitutionCombineRule, desc.isSensor, desc.collisionGroups, desc.solverGroups, desc.activeCollisionTypes, desc.activeHooks, desc.activeEvents, hasParent, hasParent ? parentHandle : 0, bodies.raw);
        rawShape.free();
        rawTra.free();
        rawRot.free();
        rawCom.free();
        // #if DIM3
        rawPrincipalInertia.free();
        rawInertiaFrame.free();
        // #endif
        return handle;
    }
    /**
     * Remove a collider from this set.
     *
     * @param handle - The integer handle of the collider to remove.
     * @param bodies - The set of rigid-body containing the rigid-body the collider is attached to.
     * @param wakeUp - If `true`, the rigid-body the removed collider is attached to will be woken-up automatically.
     */
    remove(handle, islands, bodies, wakeUp) {
        this.raw.remove(handle, islands.raw, bodies.raw, wakeUp);
    }
    /**
     * Gets the rigid-body with the given handle.
     *
     * @param handle - The handle of the rigid-body to retrieve.
     */
    get(handle) {
        if (this.raw.contains(handle)) {
            return new collider_1.Collider(this.raw, handle);
        }
        else {
            return null;
        }
    }
    /**
     * The number of colliders on this set.
     */
    len() {
        return this.raw.len();
    }
    /**
     * Does this set contain a collider with the given handle?
     *
     * @param handle - The collider handle to check.
     */
    contains(handle) {
        return this.raw.contains(handle);
    }
    /**
     * Applies the given closure to each collider contained by this set.
     *
     * @param f - The closure to apply.
     */
    forEachCollider(f) {
        this.forEachColliderHandle((handle) => {
            f(new collider_1.Collider(this.raw, handle));
        });
    }
    /**
     * Applies the given closure to the handles of each collider contained by this set.
     *
     * @param f - The closure to apply.
     */
    forEachColliderHandle(f) {
        this.raw.forEachColliderHandle(f);
    }
}
exports.ColliderSet = ColliderSet;
//# sourceMappingURL=collider_set.js.map