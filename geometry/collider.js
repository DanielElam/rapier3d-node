"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderDesc = exports.Collider = exports.ActiveCollisionTypes = void 0;
const math_1 = require("../math");
const dynamics_1 = require("../dynamics");
const shape_1 = require("./shape");
/// Flags affecting whether or not collision-detection happens between two colliders
/// depending on the type of rigid-bodies they are attached to.
var ActiveCollisionTypes;
(function (ActiveCollisionTypes) {
    /// Enable collision-detection between a collider attached to a dynamic body
    /// and another collider attached to a dynamic body.
    ActiveCollisionTypes[ActiveCollisionTypes["DYNAMIC_DYNAMIC"] = 1] = "DYNAMIC_DYNAMIC";
    /// Enable collision-detection between a collider attached to a dynamic body
    /// and another collider attached to a kinematic body.
    ActiveCollisionTypes[ActiveCollisionTypes["DYNAMIC_KINEMATIC"] = 12] = "DYNAMIC_KINEMATIC";
    /// Enable collision-detection between a collider attached to a dynamic body
    /// and another collider attached to a static body (or not attached to any body).
    ActiveCollisionTypes[ActiveCollisionTypes["DYNAMIC_STATIC"] = 2] = "DYNAMIC_STATIC";
    /// Enable collision-detection between a collider attached to a kinematic body
    /// and another collider attached to a kinematic body.
    ActiveCollisionTypes[ActiveCollisionTypes["KINEMATIC_KINEMATIC"] = 52224] = "KINEMATIC_KINEMATIC";
    /// Enable collision-detection between a collider attached to a kinematic body
    /// and another collider attached to a static body (or not attached to any body).
    ActiveCollisionTypes[ActiveCollisionTypes["KINEMATIC_STATIC"] = 8704] = "KINEMATIC_STATIC";
    /// Enable collision-detection between a collider attached to a static body (or
    /// not attached to any body) and another collider attached to a static body (or
    /// not attached to any body).
    ActiveCollisionTypes[ActiveCollisionTypes["STATIC_STATIC"] = 32] = "STATIC_STATIC";
    /// The default active collision types, enabling collisions between a dynamic body
    /// and another body of any type, but not enabling collisions between two non-dynamic bodies.
    ActiveCollisionTypes[ActiveCollisionTypes["DEFAULT"] = 15] = "DEFAULT";
    /// Enable collisions between any kind of rigid-bodies (including between two non-dynamic bodies).
    ActiveCollisionTypes[ActiveCollisionTypes["ALL"] = 60943] = "ALL";
})(ActiveCollisionTypes = exports.ActiveCollisionTypes || (exports.ActiveCollisionTypes = {}));
/**
 * A geometric entity that can be attached to a body so it can be affected
 * by contacts and proximity queries.
 */
class Collider {
    constructor(rawSet, handle) {
        this.rawSet = rawSet;
        this.handle = handle;
    }
    /**
     * Checks if this collider is still valid (i.e. that it has
     * not been deleted from the collider set yet.
     */
    isValid() {
        return this.rawSet.contains(this.handle);
    }
    /**
     * The world-space translation of this rigid-body.
     */
    translation() {
        return math_1.VectorOps.fromRaw(this.rawSet.coTranslation(this.handle));
    }
    /**
     * The world-space orientation of this rigid-body.
     */
    rotation() {
        return math_1.RotationOps.fromRaw(this.rawSet.coRotation(this.handle));
    }
    /**
     * Is this collider a sensor?
     */
    isSensor() {
        return this.rawSet.coIsSensor(this.handle);
    }
    setSensor(isSensor) {
        this.rawSet.coSetSensor(this.handle, isSensor);
    }
    setShape(shape) {
        let rawShape = shape.intoRaw();
        this.rawSet.coSetShape(this.handle, rawShape);
        rawShape.free();
    }
    /**
     * Sets the restitution coefficient of the collider to be created.
     *
     * @param restitution - The restitution coefficient in `[0, 1]`. A value of 0 (the default) means no bouncing behavior
     *                   while 1 means perfect bouncing (though energy may still be lost due to numerical errors of the
     *                   constraints solver).
     */
    setRestitution(restitution) {
        this.rawSet.coSetRestitution(this.handle, restitution);
    }
    /**
     * Sets the friction coefficient of the collider to be created.
     *
     * @param friction - The friction coefficient. Must be greater or equal to 0. This is generally smaller than 1. The
     *                   higher the coefficient, the stronger friction forces will be for contacts with the collider
     *                   being built.
     */
    setFriction(friction) {
        this.rawSet.coSetFriction(this.handle, friction);
    }
    /**
     * Gets the rule used to combine the friction coefficients of two colliders
     * colliders involved in a contact.
     */
    frictionCombineRule() {
        return this.rawSet.coFrictionCombineRule(this.handle);
    }
    /**
     * Sets the rule used to combine the friction coefficients of two colliders
     * colliders involved in a contact.
     *
     * @param rule ??? The combine rule to apply.
     */
    setFrictionCombineRule(rule) {
        this.rawSet.coSetFrictionCombineRule(this.handle, rule);
    }
    /**
     * Gets the rule used to combine the restitution coefficients of two colliders
     * colliders involved in a contact.
     */
    restitutionCombineRule() {
        return this.rawSet.coRestitutionCombineRule(this.handle);
    }
    /**
     * Sets the rule used to combine the restitution coefficients of two colliders
     * colliders involved in a contact.
     *
     * @param rule ??? The combine rule to apply.
     */
    setRestitutionCombineRule(rule) {
        this.rawSet.coSetRestitutionCombineRule(this.handle, rule);
    }
    /**
     * Sets the collision groups used by this collider.
     *
     * Two colliders will interact iff. their collision groups are compatible.
     * See the documentation of `InteractionGroups` for details on teh used bit pattern.
     *
     * @param groups - The collision groups used for the collider being built.
     */
    setCollisionGroups(groups) {
        this.rawSet.coSetCollisionGroups(this.handle, groups);
    }
    /**
     * Sets the solver groups used by this collider.
     *
     * Forces between two colliders in contact will be computed iff their solver
     * groups are compatible.
     * See the documentation of `InteractionGroups` for details on the used bit pattern.
     *
     * @param groups - The solver groups used for the collider being built.
     */
    setSolverGroups(groups) {
        this.rawSet.coSetSolverGroups(this.handle, groups);
    }
    /**
     * Get the physics hooks active for this collider.
     */
    activeHooks() {
        this.rawSet.coActiveHooks(this.handle);
    }
    /**
     * Set the physics hooks active for this collider.
     *
     * Use this to enable custom filtering rules for contact/intersecstion pairs involving this collider.
     *
     * @param activeHooks - The hooks active for contact/intersection pairs involving this collider.
     */
    setActiveHooks(activeHooks) {
        this.rawSet.coSetActiveHooks(this.handle, activeHooks);
    }
    /**
     * The events active for this collider.
     */
    activeEvents() {
        return this.rawSet.coActiveEvents(this.handle);
    }
    /**
     * Set the events active for this collider.
     *
     * Use this to enable contact and/or intersection event reporting for this collider.
     *
     * @param activeEvents - The events active for contact/intersection pairs involving this collider.
     */
    setActiveEvents(activeEvents) {
        this.rawSet.coSetActiveEvents(this.handle, activeEvents);
    }
    /**
     * Gets the collision types active for this collider.
     */
    activeCollisionTypes() {
        return this.rawSet.coActiveCollisionTypes(this.handle);
    }
    /**
     * Set the collision types active for this collider.
     *
     * @param activeCollisionTypes - The hooks active for contact/intersection pairs involving this collider.
     */
    setActiveCollisionTypes(activeCollisionTypes) {
        this.rawSet.coSetActiveCollisionTypes(this.handle, activeCollisionTypes);
    }
    /**
     * Sets the translation of this collider.
     *
     * @param tra - The world-space position of the collider.
     */
    setTranslation(tra) {
        // #if DIM3
        this.rawSet.coSetTranslation(this.handle, tra.x, tra.y, tra.z);
        // #endif
    }
    /**
     * Sets the translation of this collider relative to its parent rigid-body.
     *
     * Does nothing if this collider isn't attached to a rigid-body.
     *
     * @param tra - The new translation of the collider relative to its parent.
     */
    setTranslationWrtParent(tra) {
        // #if DIM3
        this.rawSet.coSetTranslationWrtParent(this.handle, tra.x, tra.y, tra.z);
        // #endif
    }
    // #if DIM3
    /**
     * Sets the rotation quaternion of this collider.
     *
     * This does nothing if a zero quaternion is provided.
     *
     * @param rotation - The rotation to set.
     */
    setRotation(rot) {
        this.rawSet.coSetRotation(this.handle, rot.x, rot.y, rot.z, rot.w);
    }
    /**
     * Sets the rotation quaternion of this collider relative to its parent rigid-body.
     *
     * This does nothing if a zero quaternion is provided or if this collider isn't
     * attached to a rigid-body.
     *
     * @param rotation - The rotation to set.
     */
    setRotationWrtParent(rot) {
        this.rawSet.coSetRotationWrtParent(this.handle, rot.x, rot.y, rot.z, rot.w);
    }
    // #endif
    /**
     * The type of the shape of this collider.
     */
    shapeType() {
        return this.rawSet.coShapeType(this.handle);
    }
    /**
     * The half-extents of this collider if it is a cuboid shape.
     */
    halfExtents() {
        return math_1.VectorOps.fromRaw(this.rawSet.coHalfExtents(this.handle));
    }
    /**
     * The radius of this collider if it is a ball, cylinder, capsule, or cone shape.
     */
    radius() {
        return this.rawSet.coRadius(this.handle);
    }
    /**
     * The radius of the round edges of this collider if it is a round cylinder.
     */
    roundRadius() {
        return this.rawSet.coRoundRadius(this.handle);
    }
    /**
     * The half height of this collider if it is a cylinder, capsule, or cone shape.
     */
    halfHeight() {
        return this.rawSet.coHalfHeight(this.handle);
    }
    /**
     * If this collider has a triangle mesh, polyline, convex polygon, or convex polyhedron shape,
     * this returns the vertex buffer of said shape.
     */
    vertices() {
        return this.rawSet.coVertices(this.handle);
    }
    /**
     * If this collider has a triangle mesh, polyline, or convex polyhedron shape,
     * this returns the index buffer of said shape.
     */
    indices() {
        return this.rawSet.coIndices(this.handle);
    }
    /**
     * If this collider has a heightfield shape, this returns the heights buffer of
     * the heightfield.
     * In 3D, the returned height matrix is provided in column-major order.
     */
    heightfieldHeights() {
        return this.rawSet.coHeightfieldHeights(this.handle);
    }
    /**
     * If this collider has a heightfield shape, this returns the scale
     * applied to it.
     */
    heightfieldScale() {
        let scale = this.rawSet.coHeightfieldScale(this.handle);
        return math_1.VectorOps.fromRaw(scale);
    }
    // #if DIM3
    /**
     * If this collider has a heightfield shape, this returns the number of
     * rows of its height matrix.
     */
    heightfieldNRows() {
        return this.rawSet.coHeightfieldNRows(this.handle);
    }
    /**
     * If this collider has a heightfield shape, this returns the number of
     * columns of its height matrix.
     */
    heightfieldNCols() {
        return this.rawSet.coHeightfieldNCols(this.handle);
    }
    // #endif
    /**
     * The unique integer identifier of the rigid-body this collider is attached to.
     */
    parent() {
        return this.rawSet.coParent(this.handle);
    }
    /**
     * The friction coefficient of this collider.
     */
    friction() {
        return this.rawSet.coFriction(this.handle);
    }
    /**
     * The density of this collider.
     */
    density() {
        return this.rawSet.coDensity(this.handle);
    }
    /**
     * The collision groups of this collider.
     */
    collisionGroups() {
        return this.rawSet.coCollisionGroups(this.handle);
    }
    /**
     * The solver groups of this collider.
     */
    solverGroups() {
        return this.rawSet.coSolverGroups(this.handle);
    }
}
exports.Collider = Collider;
class ColliderDesc {
    /**
     * Initializes a collider descriptor from the collision shape.
     *
     * @param shape - The shape of the collider being built.
     */
    constructor(shape) {
        this.shape = shape;
        this.useMassProps = false;
        this.density = 1.0;
        this.friction = 0.5;
        this.restitution = 0.0;
        this.rotation = math_1.RotationOps.identity();
        this.translation = math_1.VectorOps.zeros();
        this.isSensor = false;
        this.collisionGroups = 4294967295;
        this.solverGroups = 4294967295;
        this.frictionCombineRule = dynamics_1.CoefficientCombineRule.Average;
        this.restitutionCombineRule = dynamics_1.CoefficientCombineRule.Average;
        this.activeCollisionTypes = ActiveCollisionTypes.DEFAULT;
        this.activeEvents = 0;
        this.activeHooks = 0;
        this.mass = 0.0;
        this.centerOfMass = math_1.VectorOps.zeros();
        // #if DIM3
        this.principalAngularInertia = math_1.VectorOps.zeros();
        this.angularInertiaLocalFrame = math_1.RotationOps.identity();
        // #endif
    }
    /**
     * Create a new collider descriptor with a ball shape.
     *
     * @param radius - The radius of the ball.
     */
    static ball(radius) {
        const shape = new shape_1.Ball(radius);
        return new ColliderDesc(shape);
    }
    /**
     * Create a new collider descriptor with a capsule shape.
     *
     * @param halfHeight - The half-height of the capsule, along the `y` axis.
     * @param radius - The radius of the capsule basis.
     */
    static capsule(halfHeight, radius) {
        const shape = new shape_1.Capsule(halfHeight, radius);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new segment shape.
     *
     * @param a - The first point of the segment.
     * @param b - The second point of the segment.
     */
    static segment(a, b) {
        const shape = new shape_1.Segment(a, b);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new triangle shape.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     */
    static triangle(a, b, c) {
        const shape = new shape_1.Triangle(a, b, c);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new triangle shape with round corners.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     * @param borderRadius - The radius of the borders of this triangle. In 3D,
     *   this is also equal to half the thickness of the triangle.
     */
    static roundTriangle(a, b, c, borderRadius) {
        const shape = new shape_1.RoundTriangle(a, b, c, borderRadius);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor with a polyline shape.
     *
     * @param vertices - The coordinates of the polyline's vertices.
     * @param indices - The indices of the polyline's segments. If this is `null`,
     *    the vertices are assumed to describe a line strip.
     */
    static polyline(vertices, indices) {
        const shape = new shape_1.Polyline(vertices, indices);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor with a triangle mesh shape.
     *
     * @param vertices - The coordinates of the triangle mesh's vertices.
     * @param indices - The indices of the triangle mesh's triangles.
     */
    static trimesh(vertices, indices) {
        const shape = new shape_1.TriMesh(vertices, indices);
        return new ColliderDesc(shape);
    }
    // #if DIM3
    /**
     * Creates a new collider descriptor with a cuboid shape.
     *
     * @param hx - The half-width of the rectangle along its local `x` axis.
     * @param hy - The half-width of the rectangle along its local `y` axis.
     * @param hz - The half-width of the rectangle along its local `z` axis.
     */
    static cuboid(hx, hy, hz) {
        const shape = new shape_1.Cuboid(hx, hy, hz);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor with a rectangular shape with round borders.
     *
     * @param hx - The half-width of the rectangle along its local `x` axis.
     * @param hy - The half-width of the rectangle along its local `y` axis.
     * @param hz - The half-width of the rectangle along its local `z` axis.
     * @param borderRadius - The radius of the cuboid's borders.
     */
    static roundCuboid(hx, hy, hz, borderRadius) {
        const shape = new shape_1.RoundCuboid(hx, hy, hz, borderRadius);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor with a heightfield shape.
     *
     * @param nrows ??? The number of rows in the heights matrix.
     * @param ncols - The number of columns in the heights matrix.
     * @param heights - The heights of the heightfield along its local `y` axis,
     *                  provided as a matrix stored in column-major order.
     * @param scale - The scale factor applied to the heightfield.
     */
    static heightfield(nrows, ncols, heights, scale) {
        const shape = new shape_1.Heightfield(nrows, ncols, heights, scale);
        return new ColliderDesc(shape);
    }
    /**
     * Create a new collider descriptor with a cylinder shape.
     *
     * @param halfHeight - The half-height of the cylinder, along the `y` axis.
     * @param radius - The radius of the cylinder basis.
     */
    static cylinder(halfHeight, radius) {
        const shape = new shape_1.Cylinder(halfHeight, radius);
        return new ColliderDesc(shape);
    }
    /**
     * Create a new collider descriptor with a cylinder shape with rounded corners.
     *
     * @param halfHeight - The half-height of the cylinder, along the `y` axis.
     * @param radius - The radius of the cylinder basis.
     * @param borderRadius - The radius of the cylinder's rounded edges and vertices.
     */
    static roundCylinder(halfHeight, radius, borderRadius) {
        const shape = new shape_1.RoundCylinder(halfHeight, radius, borderRadius);
        return new ColliderDesc(shape);
    }
    /**
     * Create a new collider descriptor with a cone shape.
     *
     * @param halfHeight - The half-height of the cone, along the `y` axis.
     * @param radius - The radius of the cone basis.
     */
    static cone(halfHeight, radius) {
        const shape = new shape_1.Cone(halfHeight, radius);
        return new ColliderDesc(shape);
    }
    /**
     * Create a new collider descriptor with a cone shape with rounded corners.
     *
     * @param halfHeight - The half-height of the cone, along the `y` axis.
     * @param radius - The radius of the cone basis.
     * @param borderRadius - The radius of the cone's rounded edges and vertices.
     */
    static roundCone(halfHeight, radius, borderRadius) {
        const shape = new shape_1.RoundCone(halfHeight, radius, borderRadius);
        return new ColliderDesc(shape);
    }
    /**
     * Computes the convex-hull of the given points and use the resulting
     * convex polyhedron as the shape for this new collider descriptor.
     *
     * @param points - The point that will be used to compute the convex-hull.
     */
    static convexHull(points) {
        const shape = new shape_1.ConvexPolyhedron(points, null);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor that uses the given set of points assumed
     * to form a convex polyline (no convex-hull computation will be done).
     *
     * @param vertices - The vertices of the convex polyline.
     */
    static convexMesh(vertices, indices) {
        const shape = new shape_1.ConvexPolyhedron(vertices, indices);
        return new ColliderDesc(shape);
    }
    /**
     * Computes the convex-hull of the given points and use the resulting
     * convex polyhedron as the shape for this new collider descriptor. A
     * border is added to that convex polyhedron to give it round corners.
     *
     * @param points - The point that will be used to compute the convex-hull.
     * @param borderRadius - The radius of the round border added to the convex polyhedron.
     */
    static roundConvexHull(points, borderRadius) {
        const shape = new shape_1.RoundConvexPolyhedron(points, null, borderRadius);
        return new ColliderDesc(shape);
    }
    /**
     * Creates a new collider descriptor that uses the given set of points assumed
     * to form a round convex polyline (no convex-hull computation will be done).
     *
     * @param vertices - The vertices of the convex polyline.
     * @param borderRadius - The radius of the round border added to the convex polyline.
     */
    static roundConvexMesh(vertices, indices, borderRadius) {
        const shape = new shape_1.RoundConvexPolyhedron(vertices, indices, borderRadius);
        return new ColliderDesc(shape);
    }
    // #endif
    // #if DIM3
    /**
     * Sets the position of the collider to be created relative to the rigid-body it is attached to.
     */
    setTranslation(x, y, z) {
        if (typeof x != "number" || typeof y != "number" || typeof z != "number")
            throw TypeError("The translation components must be numbers.");
        this.translation = { x: x, y: y, z: z };
        return this;
    }
    // #endif
    /**
     * Sets the rotation of the collider to be created relative to the rigid-body it is attached to.
     *
     * @param rot - The rotation of the collider to be created relative to the rigid-body it is attached to.
     */
    setRotation(rot) {
        this.rotation = rot;
        return this;
    }
    /**
     * Sets whether or not the collider being created is a sensor.
     *
     * A sensor collider does not take part of the physics simulation, but generates
     * proximity events.
     *
     * @param is - Set to `true` of the collider built is to be a sensor.
     */
    setSensor(is) {
        this.isSensor = is;
        return this;
    }
    /**
     * Sets the density of the collider being built.
     *
     * @param density - The density to set, must be greater or equal to 0. A density of 0 means that this collider
     *                  will not affect the mass or angular inertia of the rigid-body it is attached to.
     */
    setDensity(density) {
        this.useMassProps = false;
        this.density = density;
        return this;
    }
    // #if DIM3
    /**
     * Sets the mass properties of the collider being built.
     *
     * This replaces the mass-properties automatically computed from the collider's density and shape.
     * These mass-properties will be added to the mass-properties of the rigid-body this collider will be attached to.
     *
     * @param mass ??? The mass of the collider to create.
     * @param centerOfMass ??? The center-of-mass of the collider to create.
     * @param principalAngularInertia ??? The initial principal angular inertia of the collider to create.
     *                                  These are the eigenvalues of the angular inertia matrix.
     * @param angularInertiaLocalFrame ??? The initial local angular inertia frame of the collider to create.
     *                                   These are the eigenvectors of the angular inertia matrix.
     */
    setMassProperties(mass, centerOfMass, principalAngularInertia, angularInertiaLocalFrame) {
        this.useMassProps = true;
        this.mass = mass;
        this.centerOfMass = centerOfMass;
        this.principalAngularInertia = principalAngularInertia;
        this.angularInertiaLocalFrame = angularInertiaLocalFrame;
        return this;
    }
    // #endif
    /**
     * Sets the restitution coefficient of the collider to be created.
     *
     * @param restitution - The restitution coefficient in `[0, 1]`. A value of 0 (the default) means no bouncing behavior
     *                   while 1 means perfect bouncing (though energy may still be lost due to numerical errors of the
     *                   constraints solver).
     */
    setRestitution(restitution) {
        this.restitution = restitution;
        return this;
    }
    /**
     * Sets the friction coefficient of the collider to be created.
     *
     * @param friction - The friction coefficient. Must be greater or equal to 0. This is generally smaller than 1. The
     *                   higher the coefficient, the stronger friction forces will be for contacts with the collider
     *                   being built.
     */
    setFriction(friction) {
        this.friction = friction;
        return this;
    }
    /**
     * Sets the rule used to combine the friction coefficients of two colliders
     * colliders involved in a contact.
     *
     * @param rule ??? The combine rule to apply.
     */
    setFrictionCombineRule(rule) {
        this.frictionCombineRule = rule;
        return this;
    }
    /**
     * Sets the rule used to combine the restitution coefficients of two colliders
     * colliders involved in a contact.
     *
     * @param rule ??? The combine rule to apply.
     */
    setRestitutionCombineRule(rule) {
        this.restitutionCombineRule = rule;
        return this;
    }
    /**
     * Sets the collision groups used by this collider.
     *
     * Two colliders will interact iff. their collision groups are compatible.
     * See the documentation of `InteractionGroups` for details on teh used bit pattern.
     *
     * @param groups - The collision groups used for the collider being built.
     */
    setCollisionGroups(groups) {
        this.collisionGroups = groups;
        return this;
    }
    /**
     * Sets the solver groups used by this collider.
     *
     * Forces between two colliders in contact will be computed iff their solver
     * groups are compatible.
     * See the documentation of `InteractionGroups` for details on the used bit pattern.
     *
     * @param groups - The solver groups used for the collider being built.
     */
    setSolverGroups(groups) {
        this.solverGroups = groups;
        return this;
    }
    /**
     * Set the physics hooks active for this collider.
     *
     * Use this to enable custom filtering rules for contact/intersecstion pairs involving this collider.
     *
     * @param activeHooks - The hooks active for contact/intersection pairs involving this collider.
     */
    setActiveHooks(activeHooks) {
        this.activeHooks = activeHooks;
        return this;
    }
    /**
     * Set the events active for this collider.
     *
     * Use this to enable contact and/or intersection event reporting for this collider.
     *
     * @param activeEvents - The events active for contact/intersection pairs involving this collider.
     */
    setActiveEvents(activeEvents) {
        this.activeEvents = activeEvents;
        return this;
    }
    /**
     * Set the collision types active for this collider.
     *
     * @param activeCollisionTypes - The hooks active for contact/intersection pairs involving this collider.
     */
    setActiveCollisionTypes(activeCollisionTypes) {
        this.activeCollisionTypes = activeCollisionTypes;
        return this;
    }
}
exports.ColliderDesc = ColliderDesc;
//# sourceMappingURL=collider.js.map