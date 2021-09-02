"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundCone = exports.Cone = exports.RoundCylinder = exports.Cylinder = exports.Heightfield = exports.RoundConvexPolyhedron = exports.ConvexPolyhedron = exports.TriMesh = exports.Polyline = exports.RoundTriangle = exports.Triangle = exports.Segment = exports.Capsule = exports.RoundCuboid = exports.Cuboid = exports.Ball = exports.ShapeType = void 0;
const math_1 = require("../math");
const raw_1 = require("../raw");
/**
 * An enumeration representing the type of a shape.
 */
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["Ball"] = 0] = "Ball";
    ShapeType[ShapeType["Cuboid"] = 1] = "Cuboid";
    ShapeType[ShapeType["Capsule"] = 2] = "Capsule";
    ShapeType[ShapeType["Segment"] = 3] = "Segment";
    ShapeType[ShapeType["Polyline"] = 4] = "Polyline";
    ShapeType[ShapeType["Triangle"] = 5] = "Triangle";
    ShapeType[ShapeType["TriMesh"] = 6] = "TriMesh";
    ShapeType[ShapeType["HeightField"] = 7] = "HeightField";
    // Compound = 8,
    ShapeType[ShapeType["ConvexPolyhedron"] = 9] = "ConvexPolyhedron";
    ShapeType[ShapeType["Cylinder"] = 10] = "Cylinder";
    ShapeType[ShapeType["Cone"] = 11] = "Cone";
    ShapeType[ShapeType["RoundCuboid"] = 12] = "RoundCuboid";
    ShapeType[ShapeType["RoundTriangle"] = 13] = "RoundTriangle";
    ShapeType[ShapeType["RoundCylinder"] = 14] = "RoundCylinder";
    ShapeType[ShapeType["RoundCone"] = 15] = "RoundCone";
    ShapeType[ShapeType["RoundConvexPolyhedron"] = 16] = "RoundConvexPolyhedron";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
// #endif
/**
 * A shape that is a sphere in 3D and a circle in 2D.
 */
class Ball {
    /**
     * Creates a new ball with the given radius.
     * @param radius - The balls radius.
     */
    constructor(radius) {
        this.radius = radius;
    }
    intoRaw() {
        return raw_1.RawShape.ball(this.radius);
    }
}
exports.Ball = Ball;
/**
 * A shape that is a box in 3D and a rectangle in 2D.
 */
class Cuboid {
    // #if DIM3
    /**
     * Creates a new 3D cuboid.
     * @param hx - The half width of the cuboid.
     * @param hy - The half height of the cuboid.
     * @param hz - The half depth of the cuboid.
     */
    constructor(hx, hy, hz) {
        this.halfExtents = math_1.VectorOps.new(hx, hy, hz);
    }
    // #endif
    intoRaw() {
        // #if DIM3
        return raw_1.RawShape.cuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z);
        // #endif
    }
}
exports.Cuboid = Cuboid;
/**
 * A shape that is a box in 3D and a rectangle in 2D, with round corners.
 */
class RoundCuboid {
    // #if DIM3
    /**
     * Creates a new 3D cuboid.
     * @param hx - The half width of the cuboid.
     * @param hy - The half height of the cuboid.
     * @param hz - The half depth of the cuboid.
     * @param borderRadius - The radius of the borders of this cuboid. This will
     *   effectively increase the half-extents of the cuboid by this radius.
     */
    constructor(hx, hy, hz, borderRadius) {
        this.halfExtents = math_1.VectorOps.new(hx, hy, hz);
        this.borderRadius = borderRadius;
    }
    // #endif
    intoRaw() {
        // #if DIM3
        return raw_1.RawShape.roundCuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z, this.borderRadius);
        // #endif
    }
}
exports.RoundCuboid = RoundCuboid;
/**
 * A shape that is a capsule.
 */
class Capsule {
    /**
     * Creates a new capsule with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     */
    constructor(halfHeight, radius) {
        this.halfHeight = halfHeight;
        this.radius = radius;
    }
    intoRaw() {
        return raw_1.RawShape.capsule(this.halfHeight, this.radius);
    }
}
exports.Capsule = Capsule;
/**
 * A shape that is a segment.
 */
class Segment {
    /**
     * Creates a new segment shape.
     * @param a - The first point of the segment.
     * @param b - The second point of the segment.
     */
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    intoRaw() {
        let ra = math_1.VectorOps.intoRaw(this.a);
        let rb = math_1.VectorOps.intoRaw(this.b);
        let result = raw_1.RawShape.segment(ra, rb);
        ra.free();
        rb.free();
        return result;
    }
}
exports.Segment = Segment;
/**
 * A shape that is a segment.
 */
class Triangle {
    /**
     * Creates a new triangle shape.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     */
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    intoRaw() {
        let ra = math_1.VectorOps.intoRaw(this.a);
        let rb = math_1.VectorOps.intoRaw(this.b);
        let rc = math_1.VectorOps.intoRaw(this.c);
        let result = raw_1.RawShape.triangle(ra, rb, rc);
        ra.free();
        rb.free();
        rc.free();
        return result;
    }
}
exports.Triangle = Triangle;
/**
 * A shape that is a triangle with round borders and a non-zero thickness.
 */
class RoundTriangle {
    /**
     * Creates a new triangle shape with round corners.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     * @param borderRadius - The radius of the borders of this triangle. In 3D,
     *   this is also equal to half the thickness of the triangle.
     */
    constructor(a, b, c, borderRadius) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.borderRadius = borderRadius;
    }
    intoRaw() {
        let ra = math_1.VectorOps.intoRaw(this.a);
        let rb = math_1.VectorOps.intoRaw(this.b);
        let rc = math_1.VectorOps.intoRaw(this.c);
        let result = raw_1.RawShape.roundTriangle(ra, rb, rc, this.borderRadius);
        ra.free();
        rb.free();
        rc.free();
        return result;
    }
}
exports.RoundTriangle = RoundTriangle;
/**
 * A shape that is a triangle mesh.
 */
class Polyline {
    /**
     * Creates a new polyline shape.
     *
     * @param vertices - The coordinates of the polyline's vertices.
     * @param indices - The indices of the polyline's segments. If this is `null` then
     *    the vertices are assumed to form a line strip.
     */
    constructor(vertices, indices) {
        this.vertices = vertices;
        this.indices = !!indices ? indices : new Uint32Array(0);
    }
    intoRaw() {
        return raw_1.RawShape.polyline(this.vertices, this.indices);
    }
}
exports.Polyline = Polyline;
/**
 * A shape that is a triangle mesh.
 */
class TriMesh {
    /**
     * Creates a new triangle mesh shape.
     *
     * @param vertices - The coordinates of the triangle mesh's vertices.
     * @param indices - The indices of the triangle mesh's triangles.
     */
    constructor(vertices, indices) {
        this.vertices = vertices;
        this.indices = indices;
    }
    intoRaw() {
        return raw_1.RawShape.trimesh(this.vertices, this.indices);
    }
}
exports.TriMesh = TriMesh;
// #if DIM3
/**
 * A shape that is a convex polygon.
 */
class ConvexPolyhedron {
    /**
     * Creates a new convex polygon shape.
     *
     * @param vertices - The coordinates of the convex polygon's vertices.
     * @param indices - The index buffer of this convex mesh. If this is `null`
     *   or `undefined`, the convex-hull of the input vertices will be computed
     *   automatically. Otherwise, it will be assumed that the mesh you provide
     *   is already convex.
     */
    constructor(vertices, indices) {
        this.vertices = vertices;
        this.indices = indices;
    }
    intoRaw() {
        if (!!this.indices) {
            return raw_1.RawShape.convexMesh(this.vertices, this.indices);
        }
        else {
            return raw_1.RawShape.convexHull(this.vertices);
        }
    }
}
exports.ConvexPolyhedron = ConvexPolyhedron;
/**
 * A shape that is a convex polygon.
 */
class RoundConvexPolyhedron {
    /**
     * Creates a new convex polygon shape.
     *
     * @param vertices - The coordinates of the convex polygon's vertices.
     * @param indices - The index buffer of this convex mesh. If this is `null`
     *   or `undefined`, the convex-hull of the input vertices will be computed
     *   automatically. Otherwise, it will be assumed that the mesh you provide
     *   is already convex.
     * @param borderRadius - The radius of the borders of this convex polyhedron.
     */
    constructor(vertices, indices, borderRadius) {
        this.vertices = vertices;
        this.indices = indices;
        this.borderRadius = borderRadius;
    }
    intoRaw() {
        if (!!this.indices) {
            return raw_1.RawShape.roundConvexMesh(this.vertices, this.indices, this.borderRadius);
        }
        else {
            return raw_1.RawShape.roundConvexHull(this.vertices, this.borderRadius);
        }
    }
}
exports.RoundConvexPolyhedron = RoundConvexPolyhedron;
/**
 * A shape that is a heightfield.
 */
class Heightfield {
    /**
     * Creates a new heightfield shape.
     *
     * @param nrows − The number of rows in the heights matrix.
     * @param ncols - The number of columns in the heights matrix.
     * @param heights - The heights of the heightfield along its local `y` axis,
     *                  provided as a matrix stored in column-major order.
     * @param scale - The dimensions of the heightfield's local `x,z` plane.
     */
    constructor(nrows, ncols, heights, scale) {
        this.nrows = nrows;
        this.ncols = ncols;
        this.heights = heights;
        this.scale = scale;
    }
    intoRaw() {
        let rawScale = math_1.VectorOps.intoRaw(this.scale);
        let rawShape = raw_1.RawShape.heightfield(this.nrows, this.ncols, this.heights, rawScale);
        rawScale.free();
        return rawShape;
    }
}
exports.Heightfield = Heightfield;
/**
 * A shape that is a 3D cylinder.
 */
class Cylinder {
    /**
     * Creates a new cylinder with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     */
    constructor(halfHeight, radius) {
        this.halfHeight = halfHeight;
        this.radius = radius;
    }
    intoRaw() {
        return raw_1.RawShape.cylinder(this.halfHeight, this.radius);
    }
}
exports.Cylinder = Cylinder;
/**
 * A shape that is a 3D cylinder with round corners.
 */
class RoundCylinder {
    /**
     * Creates a new cylinder with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     * @param borderRadius - The radius of the borders of this cylinder.
     */
    constructor(halfHeight, radius, borderRadius) {
        this.borderRadius = borderRadius;
        this.halfHeight = halfHeight;
        this.radius = radius;
    }
    intoRaw() {
        return raw_1.RawShape.roundCylinder(this.halfHeight, this.radius, this.borderRadius);
    }
}
exports.RoundCylinder = RoundCylinder;
/**
 * A shape that is a 3D cone.
 */
class Cone {
    /**
     * Creates a new cone with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     */
    constructor(halfHeight, radius) {
        this.halfHeight = halfHeight;
        this.radius = radius;
    }
    intoRaw() {
        return raw_1.RawShape.cone(this.halfHeight, this.radius);
    }
}
exports.Cone = Cone;
/**
 * A shape that is a 3D cone with round corners.
 */
class RoundCone {
    /**
     * Creates a new cone with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     * @param borderRadius - The radius of the borders of this cone.
     */
    constructor(halfHeight, radius, borderRadius) {
        this.halfHeight = halfHeight;
        this.radius = radius;
        this.borderRadius = borderRadius;
    }
    intoRaw() {
        return raw_1.RawShape.roundCone(this.halfHeight, this.radius, this.borderRadius);
    }
}
exports.RoundCone = RoundCone;
// #endif
//# sourceMappingURL=shape.js.map