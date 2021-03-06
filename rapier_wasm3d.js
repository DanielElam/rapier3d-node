let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @returns {string}
*/
module.exports.version = function() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.version(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
};

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
module.exports.RawJointType = Object.freeze({ Ball:0,"0":"Ball",Fixed:1,"1":"Fixed",Prismatic:2,"2":"Prismatic",Revolute:3,"3":"Revolute", });
/**
*/
module.exports.RawSpringModel = Object.freeze({ Disabled:0,"0":"Disabled",VelocityBased:1,"1":"VelocityBased",AccelerationBased:2,"2":"AccelerationBased",ForceBased:3,"3":"ForceBased", });
/**
*/
module.exports.RawRigidBodyType = Object.freeze({ Dynamic:0,"0":"Dynamic",Static:1,"1":"Static",KinematicPositionBased:2,"2":"KinematicPositionBased",KinematicVelocityBased:3,"3":"KinematicVelocityBased", });
/**
*/
module.exports.RawShapeType = Object.freeze({ Ball:0,"0":"Ball",Cuboid:1,"1":"Cuboid",Capsule:2,"2":"Capsule",Segment:3,"3":"Segment",Polyline:4,"4":"Polyline",Triangle:5,"5":"Triangle",TriMesh:6,"6":"TriMesh",HeightField:7,"7":"HeightField",Compound:8,"8":"Compound",ConvexPolyhedron:9,"9":"ConvexPolyhedron",Cylinder:10,"10":"Cylinder",Cone:11,"11":"Cone",RoundCuboid:12,"12":"RoundCuboid",RoundTriangle:13,"13":"RoundTriangle",RoundCylinder:14,"14":"RoundCylinder",RoundCone:15,"15":"RoundCone",RoundConvexPolyhedron:16,"16":"RoundConvexPolyhedron", });
/**
*/
class RawBroadPhase {

    static __wrap(ptr) {
        const obj = Object.create(RawBroadPhase.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawbroadphase_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawbroadphase_new();
        return RawBroadPhase.__wrap(ret);
    }
}
module.exports.RawBroadPhase = RawBroadPhase;
/**
*/
class RawCCDSolver {

    static __wrap(ptr) {
        const obj = Object.create(RawCCDSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawccdsolver_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawccdsolver_new();
        return RawCCDSolver.__wrap(ret);
    }
}
module.exports.RawCCDSolver = RawCCDSolver;
/**
*/
class RawColliderSet {

    static __wrap(ptr) {
        const obj = Object.create(RawColliderSet.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcolliderset_free(ptr);
    }
    /**
    * The world-space translation of this collider.
    * @param {number} handle
    * @returns {RawVector}
    */
    coTranslation(handle) {
        var ret = wasm.rawcolliderset_coTranslation(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The world-space orientation of this collider.
    * @param {number} handle
    * @returns {RawRotation}
    */
    coRotation(handle) {
        var ret = wasm.rawcolliderset_coRotation(this.ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
    * Sets the translation of this collider.
    *
    * # Parameters
    * - `x`: the world-space position of the collider along the `x` axis.
    * - `y`: the world-space position of the collider along the `y` axis.
    * - `z`: the world-space position of the collider along the `z` axis.
    * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
    * wasn't moving before modifying its position.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    coSetTranslation(handle, x, y, z) {
        wasm.rawcolliderset_coSetTranslation(this.ptr, handle, x, y, z);
    }
    /**
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    coSetTranslationWrtParent(handle, x, y, z) {
        wasm.rawcolliderset_coSetTranslationWrtParent(this.ptr, handle, x, y, z);
    }
    /**
    * Sets the rotation quaternion of this collider.
    *
    * This does nothing if a zero quaternion is provided.
    *
    * # Parameters
    * - `x`: the first vector component of the quaternion.
    * - `y`: the second vector component of the quaternion.
    * - `z`: the third vector component of the quaternion.
    * - `w`: the scalar component of the quaternion.
    * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
    * wasn't moving before modifying its position.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    coSetRotation(handle, x, y, z, w) {
        wasm.rawcolliderset_coSetRotation(this.ptr, handle, x, y, z, w);
    }
    /**
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    coSetRotationWrtParent(handle, x, y, z, w) {
        wasm.rawcolliderset_coSetRotationWrtParent(this.ptr, handle, x, y, z, w);
    }
    /**
    * Is this collider a sensor?
    * @param {number} handle
    * @returns {boolean}
    */
    coIsSensor(handle) {
        var ret = wasm.rawcolliderset_coIsSensor(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * The type of the shape of this collider.
    * @param {number} handle
    * @returns {number}
    */
    coShapeType(handle) {
        var ret = wasm.rawcolliderset_coShapeType(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The half-extents of this collider if it is has a cuboid shape.
    * @param {number} handle
    * @returns {RawVector | undefined}
    */
    coHalfExtents(handle) {
        var ret = wasm.rawcolliderset_coHalfExtents(this.ptr, handle);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * The radius of this collider if it is a ball, capsule, cylinder, or cone shape.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coRadius(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coRadius(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getFloat32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The radius of this collider if it is a capsule, cylinder, or cone shape.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coHalfHeight(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coHalfHeight(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getFloat32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The radius of the round edges of this collider if it is a round cylinder.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coRoundRadius(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coRoundRadius(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getFloat32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The vertices of this triangle mesh, polyline, convex polyhedron, or convex polyhedron, if it is one.
    * @param {number} handle
    * @returns {Float32Array | undefined}
    */
    coVertices(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coVertices(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0;
            if (r0 !== 0) {
                v0 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 4);
            }
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The indices of this triangle mesh, polyline, or convex polyhedron, if it is one.
    * @param {number} handle
    * @returns {Uint32Array | undefined}
    */
    coIndices(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coIndices(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0;
            if (r0 !== 0) {
                v0 = getArrayU32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 4);
            }
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The height of this heightfield if it is one.
    * @param {number} handle
    * @returns {Float32Array | undefined}
    */
    coHeightfieldHeights(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coHeightfieldHeights(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0;
            if (r0 !== 0) {
                v0 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 4);
            }
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The scaling factor applied of this heightfield if it is one.
    * @param {number} handle
    * @returns {RawVector | undefined}
    */
    coHeightfieldScale(handle) {
        var ret = wasm.rawcolliderset_coHeightfieldScale(this.ptr, handle);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * The number of rows on this heightfield's height matrix, if it is one.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coHeightfieldNRows(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coHeightfieldNRows(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The number of columns on this heightfield's height matrix, if it is one.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coHeightfieldNCols(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coHeightfieldNCols(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The unique integer identifier of the collider this collider is attached to.
    * @param {number} handle
    * @returns {number}
    */
    coParent(handle) {
        var ret = wasm.rawcolliderset_coParent(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The friction coefficient of this collider.
    * @param {number} handle
    * @returns {number}
    */
    coFriction(handle) {
        var ret = wasm.rawcolliderset_coFriction(this.ptr, handle);
        return ret;
    }
    /**
    * The density of this collider.
    * @param {number} handle
    * @returns {number | undefined}
    */
    coDensity(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coDensity(retptr, this.ptr, handle);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getFloat32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The collision groups of this collider.
    * @param {number} handle
    * @returns {number}
    */
    coCollisionGroups(handle) {
        var ret = wasm.rawcolliderset_coCollisionGroups(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The solver groups of this collider.
    * @param {number} handle
    * @returns {number}
    */
    coSolverGroups(handle) {
        var ret = wasm.rawcolliderset_coSolverGroups(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The physics hooks enabled for this collider.
    * @param {number} handle
    * @returns {number}
    */
    coActiveHooks(handle) {
        var ret = wasm.rawcolliderset_coActiveHooks(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The collision types enabled for this collider.
    * @param {number} handle
    * @returns {number}
    */
    coActiveCollisionTypes(handle) {
        var ret = wasm.rawcolliderset_coActiveCollisionTypes(this.ptr, handle);
        return ret;
    }
    /**
    * The events enabled for this collider.
    * @param {number} handle
    * @returns {number}
    */
    coActiveEvents(handle) {
        var ret = wasm.rawcolliderset_coActiveEvents(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @param {boolean} is_sensor
    */
    coSetSensor(handle, is_sensor) {
        wasm.rawcolliderset_coSetSensor(this.ptr, handle, is_sensor);
    }
    /**
    * @param {number} handle
    * @param {number} restitution
    */
    coSetRestitution(handle, restitution) {
        wasm.rawcolliderset_coSetRestitution(this.ptr, handle, restitution);
    }
    /**
    * @param {number} handle
    * @param {number} friction
    */
    coSetFriction(handle, friction) {
        wasm.rawcolliderset_coSetFriction(this.ptr, handle, friction);
    }
    /**
    * @param {number} handle
    * @returns {number}
    */
    coFrictionCombineRule(handle) {
        var ret = wasm.rawcolliderset_coFrictionCombineRule(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @param {number} rule
    */
    coSetFrictionCombineRule(handle, rule) {
        wasm.rawcolliderset_coSetFrictionCombineRule(this.ptr, handle, rule);
    }
    /**
    * @param {number} handle
    * @returns {number}
    */
    coRestitutionCombineRule(handle) {
        var ret = wasm.rawcolliderset_coRestitutionCombineRule(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @param {number} rule
    */
    coSetRestitutionCombineRule(handle, rule) {
        wasm.rawcolliderset_coSetRestitutionCombineRule(this.ptr, handle, rule);
    }
    /**
    * @param {number} handle
    * @param {number} groups
    */
    coSetCollisionGroups(handle, groups) {
        wasm.rawcolliderset_coSetCollisionGroups(this.ptr, handle, groups);
    }
    /**
    * @param {number} handle
    * @param {number} groups
    */
    coSetSolverGroups(handle, groups) {
        wasm.rawcolliderset_coSetSolverGroups(this.ptr, handle, groups);
    }
    /**
    * @param {number} handle
    * @param {number} hooks
    */
    coSetActiveHooks(handle, hooks) {
        wasm.rawcolliderset_coSetActiveHooks(this.ptr, handle, hooks);
    }
    /**
    * @param {number} handle
    * @param {number} events
    */
    coSetActiveEvents(handle, events) {
        wasm.rawcolliderset_coSetActiveEvents(this.ptr, handle, events);
    }
    /**
    * @param {number} handle
    * @param {number} types
    */
    coSetActiveCollisionTypes(handle, types) {
        wasm.rawcolliderset_coSetActiveCollisionTypes(this.ptr, handle, types);
    }
    /**
    * @param {number} handle
    * @param {RawShape} shape
    */
    coSetShape(handle, shape) {
        _assertClass(shape, RawShape);
        var ptr0 = shape.ptr;
        shape.ptr = 0;
        wasm.rawcolliderset_coSetShape(this.ptr, handle, ptr0);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawcolliderset_new();
        return RawColliderSet.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    len() {
        var ret = wasm.rawcolliderset_len(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @returns {boolean}
    */
    contains(handle) {
        var ret = wasm.rawcolliderset_contains(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * @param {RawShape} shape
    * @param {RawVector} translation
    * @param {RawRotation} rotation
    * @param {boolean} useMassProps
    * @param {number} mass
    * @param {RawVector} centerOfMass
    * @param {RawVector} principalAngularInertia
    * @param {RawRotation} angularInertiaFrame
    * @param {number} density
    * @param {number} friction
    * @param {number} restitution
    * @param {number} frictionCombineRule
    * @param {number} restitutionCombineRule
    * @param {boolean} isSensor
    * @param {number} collisionGroups
    * @param {number} solverGroups
    * @param {number} activeCollisionTypes
    * @param {number} activeHooks
    * @param {number} activeEvents
    * @param {boolean} hasParent
    * @param {number} parent
    * @param {RawRigidBodySet} bodies
    * @returns {number | undefined}
    */
    createCollider(shape, translation, rotation, useMassProps, mass, centerOfMass, principalAngularInertia, angularInertiaFrame, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, hasParent, parent, bodies) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shape, RawShape);
            _assertClass(translation, RawVector);
            _assertClass(rotation, RawRotation);
            _assertClass(centerOfMass, RawVector);
            _assertClass(principalAngularInertia, RawVector);
            _assertClass(angularInertiaFrame, RawRotation);
            _assertClass(bodies, RawRigidBodySet);
            wasm.rawcolliderset_createCollider(retptr, this.ptr, shape.ptr, translation.ptr, rotation.ptr, useMassProps, mass, centerOfMass.ptr, principalAngularInertia.ptr, angularInertiaFrame.ptr, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, hasParent, parent, bodies.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Removes a collider from this set and wake-up the rigid-body it is attached to.
    * @param {number} handle
    * @param {RawIslandManager} islands
    * @param {RawRigidBodySet} bodies
    * @param {boolean} wakeUp
    */
    remove(handle, islands, bodies, wakeUp) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        wasm.rawcolliderset_remove(this.ptr, handle, islands.ptr, bodies.ptr, wakeUp);
    }
    /**
    * Checks if a collider with the given integer handle exists.
    * @param {number} handle
    * @returns {boolean}
    */
    isHandleValid(handle) {
        var ret = wasm.rawcolliderset_contains(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Applies the given JavaScript function to the integer handle of each collider managed by this collider set.
    *
    * # Parameters
    * - `f(handle)`: the function to apply to the integer handle of each collider managed by this collider set. Called as `f(handle)`.
    * @param {Function} f
    */
    forEachColliderHandle(f) {
        try {
            wasm.rawcolliderset_forEachColliderHandle(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
module.exports.RawColliderSet = RawColliderSet;
/**
*/
class RawContactManifold {

    static __wrap(ptr) {
        const obj = Object.create(RawContactManifold.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcontactmanifold_free(ptr);
    }
    /**
    * @returns {RawVector}
    */
    normal() {
        var ret = wasm.rawcontactmanifold_normal(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {RawVector}
    */
    local_n1() {
        var ret = wasm.rawcontactmanifold_local_n1(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {RawVector}
    */
    local_n2() {
        var ret = wasm.rawcontactmanifold_local_n1(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    subshape1() {
        var ret = wasm.rawcontactmanifold_subshape1(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    subshape2() {
        var ret = wasm.rawcontactmanifold_subshape1(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    num_contacts() {
        var ret = wasm.rawcontactmanifold_num_contacts(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {RawVector | undefined}
    */
    contact_local_p1(i) {
        var ret = wasm.rawcontactmanifold_contact_local_p1(this.ptr, i);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * @param {number} i
    * @returns {RawVector | undefined}
    */
    contact_local_p2(i) {
        var ret = wasm.rawcontactmanifold_contact_local_p1(this.ptr, i);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_dist(i) {
        var ret = wasm.rawcontactmanifold_contact_dist(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_fid1(i) {
        var ret = wasm.rawcontactmanifold_contact_fid1(this.ptr, i);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_fid2(i) {
        var ret = wasm.rawcontactmanifold_contact_fid2(this.ptr, i);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_impulse(i) {
        var ret = wasm.rawcontactmanifold_contact_impulse(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_tangent_impulse_x(i) {
        var ret = wasm.rawcontactmanifold_contact_tangent_impulse_x(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    contact_tangent_impulse_y(i) {
        var ret = wasm.rawcontactmanifold_contact_tangent_impulse_y(this.ptr, i);
        return ret;
    }
    /**
    * @returns {number}
    */
    num_solver_contacts() {
        var ret = wasm.rawcontactmanifold_num_solver_contacts(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {RawVector | undefined}
    */
    solver_contact_point(i) {
        var ret = wasm.rawcontactmanifold_solver_contact_point(this.ptr, i);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    solver_contact_dist(i) {
        var ret = wasm.rawcontactmanifold_solver_contact_dist(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    solver_contact_friction(i) {
        var ret = wasm.rawcontactmanifold_solver_contact_friction(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    solver_contact_restitution(i) {
        var ret = wasm.rawcontactmanifold_solver_contact_restitution(this.ptr, i);
        return ret;
    }
    /**
    * @param {number} i
    * @returns {RawVector}
    */
    solver_contact_tangent_velocity(i) {
        var ret = wasm.rawcontactmanifold_solver_contact_tangent_velocity(this.ptr, i);
        return RawVector.__wrap(ret);
    }
}
module.exports.RawContactManifold = RawContactManifold;
/**
*/
class RawContactPair {

    static __wrap(ptr) {
        const obj = Object.create(RawContactPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcontactpair_free(ptr);
    }
    /**
    * @returns {number}
    */
    collider1() {
        var ret = wasm.rawcontactpair_collider1(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    collider2() {
        var ret = wasm.rawcontactpair_collider2(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    numContactManifolds() {
        var ret = wasm.rawcontactpair_numContactManifolds(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {RawContactManifold | undefined}
    */
    contactManifold(i) {
        var ret = wasm.rawcontactpair_contactManifold(this.ptr, i);
        return ret === 0 ? undefined : RawContactManifold.__wrap(ret);
    }
}
module.exports.RawContactPair = RawContactPair;
/**
*/
class RawDeserializedWorld {

    static __wrap(ptr) {
        const obj = Object.create(RawDeserializedWorld.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawdeserializedworld_free(ptr);
    }
    /**
    * @returns {RawVector | undefined}
    */
    takeGravity() {
        var ret = wasm.rawdeserializedworld_takeGravity(this.ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * @returns {RawIntegrationParameters | undefined}
    */
    takeIntegrationParameters() {
        var ret = wasm.rawdeserializedworld_takeIntegrationParameters(this.ptr);
        return ret === 0 ? undefined : RawIntegrationParameters.__wrap(ret);
    }
    /**
    * @returns {RawIslandManager | undefined}
    */
    takeIslandManager() {
        var ret = wasm.rawdeserializedworld_takeIslandManager(this.ptr);
        return ret === 0 ? undefined : RawIslandManager.__wrap(ret);
    }
    /**
    * @returns {RawBroadPhase | undefined}
    */
    takeBroadPhase() {
        var ret = wasm.rawdeserializedworld_takeBroadPhase(this.ptr);
        return ret === 0 ? undefined : RawBroadPhase.__wrap(ret);
    }
    /**
    * @returns {RawNarrowPhase | undefined}
    */
    takeNarrowPhase() {
        var ret = wasm.rawdeserializedworld_takeNarrowPhase(this.ptr);
        return ret === 0 ? undefined : RawNarrowPhase.__wrap(ret);
    }
    /**
    * @returns {RawRigidBodySet | undefined}
    */
    takeBodies() {
        var ret = wasm.rawdeserializedworld_takeBodies(this.ptr);
        return ret === 0 ? undefined : RawRigidBodySet.__wrap(ret);
    }
    /**
    * @returns {RawColliderSet | undefined}
    */
    takeColliders() {
        var ret = wasm.rawdeserializedworld_takeColliders(this.ptr);
        return ret === 0 ? undefined : RawColliderSet.__wrap(ret);
    }
    /**
    * @returns {RawJointSet | undefined}
    */
    takeJoints() {
        var ret = wasm.rawdeserializedworld_takeJoints(this.ptr);
        return ret === 0 ? undefined : RawJointSet.__wrap(ret);
    }
}
module.exports.RawDeserializedWorld = RawDeserializedWorld;
/**
* A structure responsible for collecting events generated
* by the physics engine.
*/
class RawEventQueue {

    static __wrap(ptr) {
        const obj = Object.create(RawEventQueue.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_raweventqueue_free(ptr);
    }
    /**
    * Creates a new event collector.
    *
    * # Parameters
    * - `autoDrain`: setting this to `true` is strongly recommended. If true, the collector will
    * be automatically drained before each `world.step(collector)`. If false, the collector will
    * keep all events in memory unless it is manually drained/cleared; this may lead to unbounded use of
    * RAM if no drain is performed.
    * @param {boolean} autoDrain
    */
    constructor(autoDrain) {
        var ret = wasm.raweventqueue_new(autoDrain);
        return RawEventQueue.__wrap(ret);
    }
    /**
    * Applies the given javascript closure on each contact event of this collector, then clear
    * the internal contact event buffer.
    *
    * # Parameters
    * - `f(handle1, handle2, started)`:  JavaScript closure applied to each contact event. The
    * closure should take three arguments: two integers representing the handles of the colliders
    * involved in the contact, and a boolean indicating if the contact started (true) or stopped
    * (false).
    * @param {Function} f
    */
    drainContactEvents(f) {
        try {
            wasm.raweventqueue_drainContactEvents(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * Applies the given javascript closure on each proximity event of this collector, then clear
    * the internal proximity event buffer.
    *
    * # Parameters
    * - `f(handle1, handle2, prev_prox, new_prox)`:  JavaScript closure applied to each proximity event. The
    * closure should take four arguments: two integers representing the handles of the colliders
    * involved in the proximity, and one boolean representing the intersection status.
    * @param {Function} f
    */
    drainIntersectionEvents(f) {
        try {
            wasm.raweventqueue_drainIntersectionEvents(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * Removes all events contained by this collector.
    */
    clear() {
        wasm.raweventqueue_clear(this.ptr);
    }
}
module.exports.RawEventQueue = RawEventQueue;
/**
*/
class RawIntegrationParameters {

    static __wrap(ptr) {
        const obj = Object.create(RawIntegrationParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawintegrationparameters_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawintegrationparameters_new();
        return RawIntegrationParameters.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    get dt() {
        var ret = wasm.rawintegrationparameters_dt(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get erp() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get jointErp() {
        var ret = wasm.rawintegrationparameters_jointErp(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get warmstartCoeff() {
        var ret = wasm.rawintegrationparameters_warmstartCoeff(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get allowedLinearError() {
        var ret = wasm.rawintegrationparameters_allowedLinearError(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get predictionDistance() {
        var ret = wasm.rawintegrationparameters_predictionDistance(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get allowedAngularError() {
        var ret = wasm.rawintegrationparameters_allowedAngularError(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get maxLinearCorrection() {
        var ret = wasm.rawintegrationparameters_maxLinearCorrection(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get maxAngularCorrection() {
        var ret = wasm.rawintegrationparameters_maxAngularCorrection(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get maxVelocityIterations() {
        var ret = wasm.rawintegrationparameters_maxVelocityIterations(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get maxPositionIterations() {
        var ret = wasm.rawintegrationparameters_maxPositionIterations(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get minIslandSize() {
        var ret = wasm.rawintegrationparameters_minIslandSize(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get maxCcdSubsteps() {
        var ret = wasm.rawintegrationparameters_maxCcdSubsteps(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} value
    */
    set dt(value) {
        wasm.rawintegrationparameters_set_dt(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set erp(value) {
        wasm.rawintegrationparameters_set_erp(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set jointErp(value) {
        wasm.rawintegrationparameters_set_jointErp(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set warmstartCoeff(value) {
        wasm.rawintegrationparameters_set_warmstartCoeff(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set allowedLinearError(value) {
        wasm.rawintegrationparameters_set_allowedLinearError(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set predictionDistance(value) {
        wasm.rawintegrationparameters_set_predictionDistance(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set allowedAngularError(value) {
        wasm.rawintegrationparameters_set_allowedAngularError(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set maxLinearCorrection(value) {
        wasm.rawintegrationparameters_set_maxLinearCorrection(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set maxAngularCorrection(value) {
        wasm.rawintegrationparameters_set_maxAngularCorrection(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set maxVelocityIterations(value) {
        wasm.rawintegrationparameters_set_maxVelocityIterations(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set maxPositionIterations(value) {
        wasm.rawintegrationparameters_set_maxPositionIterations(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set minIslandSize(value) {
        wasm.rawintegrationparameters_set_minIslandSize(this.ptr, value);
    }
    /**
    * @param {number} value
    */
    set maxCcdSubsteps(value) {
        wasm.rawintegrationparameters_set_maxCcdSubsteps(this.ptr, value);
    }
}
module.exports.RawIntegrationParameters = RawIntegrationParameters;
/**
*/
class RawIslandManager {

    static __wrap(ptr) {
        const obj = Object.create(RawIslandManager.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawislandmanager_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawislandmanager_new();
        return RawIslandManager.__wrap(ret);
    }
    /**
    * Applies the given JavaScript function to the integer handle of each active rigid-body
    * managed by this island manager.
    *
    * After a short time of inactivity, a rigid-body is automatically deactivated ("asleep") by
    * the physics engine in order to save computational power. A sleeping rigid-body never moves
    * unless it is moved manually by the user.
    *
    * # Parameters
    * - `f(handle)`: the function to apply to the integer handle of each active rigid-body managed by this
    *   set. Called as `f(collider)`.
    * @param {Function} f
    */
    forEachActiveRigidBodyHandle(f) {
        try {
            wasm.rawislandmanager_forEachActiveRigidBodyHandle(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
module.exports.RawIslandManager = RawIslandManager;
/**
*/
class RawJointParams {

    static __wrap(ptr) {
        const obj = Object.create(RawJointParams.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawjointparams_free(ptr);
    }
    /**
    * Create a new joint descriptor that builds Ball joints.
    *
    * A ball joints allows three relative rotational degrees of freedom
    * by preventing any relative translation between the anchors of the
    * two attached rigid-bodies.
    * @param {RawVector} anchor1
    * @param {RawVector} anchor2
    * @returns {RawJointParams}
    */
    static ball(anchor1, anchor2) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        var ret = wasm.rawjointparams_ball(anchor1.ptr, anchor2.ptr);
        return RawJointParams.__wrap(ret);
    }
    /**
    * Creates a new joint descriptor that builds a Prismatic joint.
    *
    * A prismatic joint removes all the degrees of freedom between the
    * affected bodies, except for the translation along one axis.
    *
    * Returns `None` if any of the provided axes cannot be normalized.
    * @param {RawVector} anchor1
    * @param {RawVector} axis1
    * @param {RawVector} tangent1
    * @param {RawVector} anchor2
    * @param {RawVector} axis2
    * @param {RawVector} tangent2
    * @param {boolean} limitsEnabled
    * @param {number} limitsMin
    * @param {number} limitsMax
    * @returns {RawJointParams | undefined}
    */
    static prismatic(anchor1, axis1, tangent1, anchor2, axis2, tangent2, limitsEnabled, limitsMin, limitsMax) {
        _assertClass(anchor1, RawVector);
        _assertClass(axis1, RawVector);
        _assertClass(tangent1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis2, RawVector);
        _assertClass(tangent2, RawVector);
        var ret = wasm.rawjointparams_prismatic(anchor1.ptr, axis1.ptr, tangent1.ptr, anchor2.ptr, axis2.ptr, tangent2.ptr, limitsEnabled, limitsMin, limitsMax);
        return ret === 0 ? undefined : RawJointParams.__wrap(ret);
    }
    /**
    * Creates a new joint descriptor that builds a Fixed joint.
    *
    * A fixed joint removes all the degrees of freedom between the affected bodies.
    * @param {RawVector} anchor1
    * @param {RawRotation} axes1
    * @param {RawVector} anchor2
    * @param {RawRotation} axes2
    * @returns {RawJointParams}
    */
    static fixed(anchor1, axes1, anchor2, axes2) {
        _assertClass(anchor1, RawVector);
        _assertClass(axes1, RawRotation);
        _assertClass(anchor2, RawVector);
        _assertClass(axes2, RawRotation);
        var ret = wasm.rawjointparams_fixed(anchor1.ptr, axes1.ptr, anchor2.ptr, axes2.ptr);
        return RawJointParams.__wrap(ret);
    }
    /**
    * Create a new joint descriptor that builds Revolute joints.
    *
    * A revolute joint removes all degrees of freedom between the affected
    * bodies except for the rotation along one axis.
    * @param {RawVector} anchor1
    * @param {RawVector} axis1
    * @param {RawVector} anchor2
    * @param {RawVector} axis2
    * @returns {RawJointParams | undefined}
    */
    static revolute(anchor1, axis1, anchor2, axis2) {
        _assertClass(anchor1, RawVector);
        _assertClass(axis1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis2, RawVector);
        var ret = wasm.rawjointparams_revolute(anchor1.ptr, axis1.ptr, anchor2.ptr, axis2.ptr);
        return ret === 0 ? undefined : RawJointParams.__wrap(ret);
    }
}
module.exports.RawJointParams = RawJointParams;
/**
*/
class RawJointSet {

    static __wrap(ptr) {
        const obj = Object.create(RawJointSet.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawjointset_free(ptr);
    }
    /**
    * The unique integer identifier of the first rigid-body this joint it attached to.
    * @param {number} handle
    * @returns {number}
    */
    jointBodyHandle1(handle) {
        var ret = wasm.rawjointset_jointBodyHandle1(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The unique integer identifier of the second rigid-body this joint is attached to.
    * @param {number} handle
    * @returns {number}
    */
    jointBodyHandle2(handle) {
        var ret = wasm.rawjointset_jointBodyHandle2(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The type of this joint given as a string.
    * @param {number} handle
    * @returns {number}
    */
    jointType(handle) {
        var ret = wasm.rawjointset_jointType(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * The rotation quaternion that aligns this joint's first local axis to the `x` axis.
    * @param {number} handle
    * @returns {RawRotation}
    */
    jointFrameX1(handle) {
        var ret = wasm.rawjointset_jointFrameX1(this.ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
    * The rotation matrix that aligns this joint's second local axis to the `x` axis.
    * @param {number} handle
    * @returns {RawRotation}
    */
    jointFrameX2(handle) {
        var ret = wasm.rawjointset_jointFrameX2(this.ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
    * The position of the first anchor of this joint.
    *
    * The first anchor gives the position of the points application point on the
    * local frame of the first rigid-body it is attached to.
    * @param {number} handle
    * @returns {RawVector}
    */
    jointAnchor1(handle) {
        var ret = wasm.rawjointset_jointAnchor1(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The position of the second anchor of this joint.
    *
    * The second anchor gives the position of the points application point on the
    * local frame of the second rigid-body it is attached to.
    * @param {number} handle
    * @returns {RawVector}
    */
    jointAnchor2(handle) {
        var ret = wasm.rawjointset_jointAnchor2(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The first axis of this joint, if any.
    *
    * For joints where an application axis makes sense (e.g. the revolute and prismatic joins),
    * this returns the application axis on the first rigid-body this joint is attached to, expressed
    * in the local-space of this first rigid-body.
    * @param {number} handle
    * @returns {RawVector | undefined}
    */
    jointAxis1(handle) {
        var ret = wasm.rawjointset_jointAxis1(this.ptr, handle);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * The second axis of this joint, if any.
    *
    * For joints where an application axis makes sense (e.g. the revolute and prismatic joins),
    * this returns the application axis on the second rigid-body this joint is attached to, expressed
    * in the local-space of this second rigid-body.
    * @param {number} handle
    * @returns {RawVector | undefined}
    */
    jointAxis2(handle) {
        var ret = wasm.rawjointset_jointAxis2(this.ptr, handle);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
    * Are the limits for this joint enabled?
    * @param {number} handle
    * @returns {boolean}
    */
    jointLimitsEnabled(handle) {
        var ret = wasm.rawjointset_jointLimitsEnabled(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * If this is a prismatic joint, returns its lower limit.
    * @param {number} handle
    * @returns {number}
    */
    jointLimitsMin(handle) {
        var ret = wasm.rawjointset_jointLimitsMin(this.ptr, handle);
        return ret;
    }
    /**
    * If this is a prismatic joint, returns its upper limit.
    * @param {number} handle
    * @returns {number}
    */
    jointLimitsMax(handle) {
        var ret = wasm.rawjointset_jointLimitsMax(this.ptr, handle);
        return ret;
    }
    /**
    * @param {number} handle
    * @param {number} model
    */
    jointConfigureMotorModel(handle, model) {
        wasm.rawjointset_jointConfigureMotorModel(this.ptr, handle, model);
    }
    /**
    * @param {number} handle
    * @param {number} vx
    * @param {number} vy
    * @param {number} vz
    * @param {number} factor
    */
    jointConfigureBallMotorVelocity(handle, vx, vy, vz, factor) {
        wasm.rawjointset_jointConfigureBallMotorVelocity(this.ptr, handle, vx, vy, vz, factor);
    }
    /**
    * @param {number} handle
    * @param {number} qw
    * @param {number} qx
    * @param {number} qy
    * @param {number} qz
    * @param {number} stiffness
    * @param {number} damping
    */
    jointConfigureBallMotorPosition(handle, qw, qx, qy, qz, stiffness, damping) {
        wasm.rawjointset_jointConfigureBallMotorPosition(this.ptr, handle, qw, qx, qy, qz, stiffness, damping);
    }
    /**
    * @param {number} handle
    * @param {number} qw
    * @param {number} qx
    * @param {number} qy
    * @param {number} qz
    * @param {number} vx
    * @param {number} vy
    * @param {number} vz
    * @param {number} stiffness
    * @param {number} damping
    */
    jointConfigureBallMotor(handle, qw, qx, qy, qz, vx, vy, vz, stiffness, damping) {
        wasm.rawjointset_jointConfigureBallMotor(this.ptr, handle, qw, qx, qy, qz, vx, vy, vz, stiffness, damping);
    }
    /**
    * @param {number} handle
    * @param {number} targetVel
    * @param {number} factor
    */
    jointConfigureUnitMotorVelocity(handle, targetVel, factor) {
        wasm.rawjointset_jointConfigureUnitMotorVelocity(this.ptr, handle, targetVel, factor);
    }
    /**
    * @param {number} handle
    * @param {number} targetPos
    * @param {number} stiffness
    * @param {number} damping
    */
    jointConfigureUnitMotorPosition(handle, targetPos, stiffness, damping) {
        wasm.rawjointset_jointConfigureUnitMotorPosition(this.ptr, handle, targetPos, stiffness, damping);
    }
    /**
    * @param {number} handle
    * @param {number} targetPos
    * @param {number} targetVel
    * @param {number} stiffness
    * @param {number} damping
    */
    jointConfigureUnitMotor(handle, targetPos, targetVel, stiffness, damping) {
        wasm.rawjointset_jointConfigureUnitMotor(this.ptr, handle, targetPos, targetVel, stiffness, damping);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawjointset_new();
        return RawJointSet.__wrap(ret);
    }
    /**
    * @param {RawRigidBodySet} bodies
    * @param {RawJointParams} params
    * @param {number} parent1
    * @param {number} parent2
    * @returns {number}
    */
    createJoint(bodies, params, parent1, parent2) {
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(params, RawJointParams);
        var ret = wasm.rawjointset_createJoint(this.ptr, bodies.ptr, params.ptr, parent1, parent2);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @param {RawIslandManager} islands
    * @param {RawRigidBodySet} bodies
    * @param {boolean} wakeUp
    */
    remove(handle, islands, bodies, wakeUp) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        wasm.rawjointset_remove(this.ptr, handle, islands.ptr, bodies.ptr, wakeUp);
    }
    /**
    * @returns {number}
    */
    len() {
        var ret = wasm.rawjointset_len(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @returns {boolean}
    */
    contains(handle) {
        var ret = wasm.rawjointset_contains(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Applies the given JavaScript function to the integer handle of each joint managed by this physics world.
    *
    * # Parameters
    * - `f(handle)`: the function to apply to the integer handle of each joint managed by this set. Called as `f(collider)`.
    * @param {Function} f
    */
    forEachJointHandle(f) {
        try {
            wasm.rawjointset_forEachJointHandle(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
module.exports.RawJointSet = RawJointSet;
/**
*/
class RawNarrowPhase {

    static __wrap(ptr) {
        const obj = Object.create(RawNarrowPhase.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawnarrowphase_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawnarrowphase_new();
        return RawNarrowPhase.__wrap(ret);
    }
    /**
    * @param {number} handle1
    * @param {Function} f
    */
    contacts_with(handle1, f) {
        wasm.rawnarrowphase_contacts_with(this.ptr, handle1, addHeapObject(f));
    }
    /**
    * @param {number} handle1
    * @param {number} handle2
    * @returns {RawContactPair | undefined}
    */
    contact_pair(handle1, handle2) {
        var ret = wasm.rawnarrowphase_contact_pair(this.ptr, handle1, handle2);
        return ret === 0 ? undefined : RawContactPair.__wrap(ret);
    }
    /**
    * @param {number} handle1
    * @param {Function} f
    */
    intersections_with(handle1, f) {
        wasm.rawnarrowphase_intersections_with(this.ptr, handle1, addHeapObject(f));
    }
    /**
    * @param {number} handle1
    * @param {number} handle2
    * @returns {boolean}
    */
    intersection_pair(handle1, handle2) {
        var ret = wasm.rawnarrowphase_intersection_pair(this.ptr, handle1, handle2);
        return ret !== 0;
    }
}
module.exports.RawNarrowPhase = RawNarrowPhase;
/**
*/
class RawPhysicsPipeline {

    static __wrap(ptr) {
        const obj = Object.create(RawPhysicsPipeline.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawphysicspipeline_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawphysicspipeline_new();
        return RawPhysicsPipeline.__wrap(ret);
    }
    /**
    * @param {RawVector} gravity
    * @param {RawIntegrationParameters} integrationParameters
    * @param {RawIslandManager} islands
    * @param {RawBroadPhase} broadPhase
    * @param {RawNarrowPhase} narrowPhase
    * @param {RawRigidBodySet} bodies
    * @param {RawColliderSet} colliders
    * @param {RawJointSet} joints
    * @param {RawCCDSolver} ccd_solver
    */
    step(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, joints, ccd_solver) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawJointSet);
        _assertClass(ccd_solver, RawCCDSolver);
        wasm.rawphysicspipeline_step(this.ptr, gravity.ptr, integrationParameters.ptr, islands.ptr, broadPhase.ptr, narrowPhase.ptr, bodies.ptr, colliders.ptr, joints.ptr, ccd_solver.ptr);
    }
    /**
    * @param {RawVector} gravity
    * @param {RawIntegrationParameters} integrationParameters
    * @param {RawIslandManager} islands
    * @param {RawBroadPhase} broadPhase
    * @param {RawNarrowPhase} narrowPhase
    * @param {RawRigidBodySet} bodies
    * @param {RawColliderSet} colliders
    * @param {RawJointSet} joints
    * @param {RawCCDSolver} ccd_solver
    * @param {RawEventQueue} eventQueue
    * @param {object} hookObject
    * @param {Function} hookFilterContactPair
    * @param {Function} hookFilterIntersectionPair
    */
    stepWithEvents(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, joints, ccd_solver, eventQueue, hookObject, hookFilterContactPair, hookFilterIntersectionPair) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawJointSet);
        _assertClass(ccd_solver, RawCCDSolver);
        _assertClass(eventQueue, RawEventQueue);
        wasm.rawphysicspipeline_stepWithEvents(this.ptr, gravity.ptr, integrationParameters.ptr, islands.ptr, broadPhase.ptr, narrowPhase.ptr, bodies.ptr, colliders.ptr, joints.ptr, ccd_solver.ptr, eventQueue.ptr, addHeapObject(hookObject), addHeapObject(hookFilterContactPair), addHeapObject(hookFilterIntersectionPair));
    }
}
module.exports.RawPhysicsPipeline = RawPhysicsPipeline;
/**
*/
class RawPointColliderProjection {

    static __wrap(ptr) {
        const obj = Object.create(RawPointColliderProjection.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawpointcolliderprojection_free(ptr);
    }
    /**
    * @returns {number}
    */
    colliderHandle() {
        var ret = wasm.rawpointcolliderprojection_colliderHandle(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {RawVector}
    */
    point() {
        var ret = wasm.rawpointcolliderprojection_point(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    isInside() {
        var ret = wasm.rawpointcolliderprojection_isInside(this.ptr);
        return ret !== 0;
    }
}
module.exports.RawPointColliderProjection = RawPointColliderProjection;
/**
*/
class RawQueryPipeline {

    static __wrap(ptr) {
        const obj = Object.create(RawQueryPipeline.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawquerypipeline_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawquerypipeline_new();
        return RawQueryPipeline.__wrap(ret);
    }
    /**
    * @param {RawIslandManager} islands
    * @param {RawRigidBodySet} bodies
    * @param {RawColliderSet} colliders
    */
    update(islands, bodies, colliders) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        wasm.rawquerypipeline_update(this.ptr, islands.ptr, bodies.ptr, colliders.ptr);
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} rayOrig
    * @param {RawVector} rayDir
    * @param {number} maxToi
    * @param {boolean} solid
    * @param {number} groups
    * @returns {RawRayColliderToi | undefined}
    */
    castRay(colliders, rayOrig, rayDir, maxToi, solid, groups) {
        _assertClass(colliders, RawColliderSet);
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        var ret = wasm.rawquerypipeline_castRay(this.ptr, colliders.ptr, rayOrig.ptr, rayDir.ptr, maxToi, solid, groups);
        return ret === 0 ? undefined : RawRayColliderToi.__wrap(ret);
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} rayOrig
    * @param {RawVector} rayDir
    * @param {number} maxToi
    * @param {boolean} solid
    * @param {number} groups
    * @returns {RawRayColliderIntersection | undefined}
    */
    castRayAndGetNormal(colliders, rayOrig, rayDir, maxToi, solid, groups) {
        _assertClass(colliders, RawColliderSet);
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        var ret = wasm.rawquerypipeline_castRayAndGetNormal(this.ptr, colliders.ptr, rayOrig.ptr, rayDir.ptr, maxToi, solid, groups);
        return ret === 0 ? undefined : RawRayColliderIntersection.__wrap(ret);
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} rayOrig
    * @param {RawVector} rayDir
    * @param {number} maxToi
    * @param {boolean} solid
    * @param {number} groups
    * @param {Function} callback
    */
    intersectionsWithRay(colliders, rayOrig, rayDir, maxToi, solid, groups, callback) {
        try {
            _assertClass(colliders, RawColliderSet);
            _assertClass(rayOrig, RawVector);
            _assertClass(rayDir, RawVector);
            wasm.rawquerypipeline_intersectionsWithRay(this.ptr, colliders.ptr, rayOrig.ptr, rayDir.ptr, maxToi, solid, groups, addBorrowedObject(callback));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} shapePos
    * @param {RawRotation} shapeRot
    * @param {RawShape} shape
    * @param {number} groups
    * @returns {number | undefined}
    */
    intersectionWithShape(colliders, shapePos, shapeRot, shape, groups) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(colliders, RawColliderSet);
            _assertClass(shapePos, RawVector);
            _assertClass(shapeRot, RawRotation);
            _assertClass(shape, RawShape);
            wasm.rawquerypipeline_intersectionWithShape(retptr, this.ptr, colliders.ptr, shapePos.ptr, shapeRot.ptr, shape.ptr, groups);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} point
    * @param {boolean} solid
    * @param {number} groups
    * @returns {RawPointColliderProjection | undefined}
    */
    projectPoint(colliders, point, solid, groups) {
        _assertClass(colliders, RawColliderSet);
        _assertClass(point, RawVector);
        var ret = wasm.rawquerypipeline_projectPoint(this.ptr, colliders.ptr, point.ptr, solid, groups);
        return ret === 0 ? undefined : RawPointColliderProjection.__wrap(ret);
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} point
    * @param {number} groups
    * @param {Function} callback
    */
    intersectionsWithPoint(colliders, point, groups, callback) {
        try {
            _assertClass(colliders, RawColliderSet);
            _assertClass(point, RawVector);
            wasm.rawquerypipeline_intersectionsWithPoint(this.ptr, colliders.ptr, point.ptr, groups, addBorrowedObject(callback));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} shapePos
    * @param {RawRotation} shapeRot
    * @param {RawVector} shapeVel
    * @param {RawShape} shape
    * @param {number} maxToi
    * @param {number} groups
    * @returns {RawShapeColliderTOI | undefined}
    */
    castShape(colliders, shapePos, shapeRot, shapeVel, shape, maxToi, groups) {
        _assertClass(colliders, RawColliderSet);
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(shapeVel, RawVector);
        _assertClass(shape, RawShape);
        var ret = wasm.rawquerypipeline_castShape(this.ptr, colliders.ptr, shapePos.ptr, shapeRot.ptr, shapeVel.ptr, shape.ptr, maxToi, groups);
        return ret === 0 ? undefined : RawShapeColliderTOI.__wrap(ret);
    }
    /**
    * @param {RawColliderSet} colliders
    * @param {RawVector} shapePos
    * @param {RawRotation} shapeRot
    * @param {RawShape} shape
    * @param {number} groups
    * @param {Function} callback
    */
    intersectionsWithShape(colliders, shapePos, shapeRot, shape, groups, callback) {
        try {
            _assertClass(colliders, RawColliderSet);
            _assertClass(shapePos, RawVector);
            _assertClass(shapeRot, RawRotation);
            _assertClass(shape, RawShape);
            wasm.rawquerypipeline_intersectionsWithShape(this.ptr, colliders.ptr, shapePos.ptr, shapeRot.ptr, shape.ptr, groups, addBorrowedObject(callback));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {RawVector} aabbCenter
    * @param {RawVector} aabbHalfExtents
    * @param {Function} callback
    */
    collidersWithAabbIntersectingAabb(aabbCenter, aabbHalfExtents, callback) {
        try {
            _assertClass(aabbCenter, RawVector);
            var ptr0 = aabbCenter.ptr;
            aabbCenter.ptr = 0;
            _assertClass(aabbHalfExtents, RawVector);
            var ptr1 = aabbHalfExtents.ptr;
            aabbHalfExtents.ptr = 0;
            wasm.rawquerypipeline_collidersWithAabbIntersectingAabb(this.ptr, ptr0, ptr1, addBorrowedObject(callback));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
module.exports.RawQueryPipeline = RawQueryPipeline;
/**
*/
class RawRayColliderIntersection {

    static __wrap(ptr) {
        const obj = Object.create(RawRayColliderIntersection.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawraycolliderintersection_free(ptr);
    }
    /**
    * @returns {number}
    */
    colliderHandle() {
        var ret = wasm.rawpointcolliderprojection_colliderHandle(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {RawVector}
    */
    normal() {
        var ret = wasm.rawraycolliderintersection_normal(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    toi() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
}
module.exports.RawRayColliderIntersection = RawRayColliderIntersection;
/**
*/
class RawRayColliderToi {

    static __wrap(ptr) {
        const obj = Object.create(RawRayColliderToi.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawraycollidertoi_free(ptr);
    }
    /**
    * @returns {number}
    */
    colliderHandle() {
        var ret = wasm.rawpointcolliderprojection_colliderHandle(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    toi() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
}
module.exports.RawRayColliderToi = RawRayColliderToi;
/**
*/
class RawRigidBodySet {

    static __wrap(ptr) {
        const obj = Object.create(RawRigidBodySet.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawrigidbodyset_free(ptr);
    }
    /**
    * The world-space translation of this rigid-body.
    * @param {number} handle
    * @returns {RawVector}
    */
    rbTranslation(handle) {
        var ret = wasm.rawrigidbodyset_rbTranslation(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The world-space orientation of this rigid-body.
    * @param {number} handle
    * @returns {RawRotation}
    */
    rbRotation(handle) {
        var ret = wasm.rawrigidbodyset_rbRotation(this.ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
    * Put the given rigid-body to sleep.
    * @param {number} handle
    */
    rbSleep(handle) {
        wasm.rawrigidbodyset_rbSleep(this.ptr, handle);
    }
    /**
    * Is this rigid-body sleeping?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsSleeping(handle) {
        var ret = wasm.rawrigidbodyset_rbIsSleeping(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Is the velocity of this rigid-body not zero?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsMoving(handle) {
        var ret = wasm.rawrigidbodyset_rbIsMoving(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * The world-space predicted translation of this rigid-body.
    *
    * If this rigid-body is kinematic this value is set by the `setNextKinematicTranslation`
    * method and is used for estimating the kinematic body velocity at the next timestep.
    * For non-kinematic bodies, this value is currently unspecified.
    * @param {number} handle
    * @returns {RawVector}
    */
    rbNextTranslation(handle) {
        var ret = wasm.rawrigidbodyset_rbNextTranslation(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The world-space predicted orientation of this rigid-body.
    *
    * If this rigid-body is kinematic this value is set by the `setNextKinematicRotation`
    * method and is used for estimating the kinematic body velocity at the next timestep.
    * For non-kinematic bodies, this value is currently unspecified.
    * @param {number} handle
    * @returns {RawRotation}
    */
    rbNextRotation(handle) {
        var ret = wasm.rawrigidbodyset_rbNextRotation(this.ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
    * Sets the translation of this rigid-body.
    *
    * # Parameters
    * - `x`: the world-space position of the rigid-body along the `x` axis.
    * - `y`: the world-space position of the rigid-body along the `y` axis.
    * - `z`: the world-space position of the rigid-body along the `z` axis.
    * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
    * wasn't moving before modifying its position.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {boolean} wakeUp
    */
    rbSetTranslation(handle, x, y, z, wakeUp) {
        wasm.rawrigidbodyset_rbSetTranslation(this.ptr, handle, x, y, z, wakeUp);
    }
    /**
    * Sets the rotation quaternion of this rigid-body.
    *
    * This does nothing if a zero quaternion is provided.
    *
    * # Parameters
    * - `x`: the first vector component of the quaternion.
    * - `y`: the second vector component of the quaternion.
    * - `z`: the third vector component of the quaternion.
    * - `w`: the scalar component of the quaternion.
    * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
    * wasn't moving before modifying its position.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    * @param {boolean} wakeUp
    */
    rbSetRotation(handle, x, y, z, w, wakeUp) {
        wasm.rawrigidbodyset_rbSetRotation(this.ptr, handle, x, y, z, w, wakeUp);
    }
    /**
    * Sets the linear velocity of this rigid-body.
    * @param {number} handle
    * @param {RawVector} linvel
    * @param {boolean} wakeUp
    */
    rbSetLinvel(handle, linvel, wakeUp) {
        _assertClass(linvel, RawVector);
        wasm.rawrigidbodyset_rbSetLinvel(this.ptr, handle, linvel.ptr, wakeUp);
    }
    /**
    * Sets the angular velocity of this rigid-body.
    * @param {number} handle
    * @param {RawVector} angvel
    * @param {boolean} wakeUp
    */
    rbSetAngvel(handle, angvel, wakeUp) {
        _assertClass(angvel, RawVector);
        wasm.rawrigidbodyset_rbSetAngvel(this.ptr, handle, angvel.ptr, wakeUp);
    }
    /**
    * If this rigid body is kinematic, sets its future translation after the next timestep integration.
    *
    * This should be used instead of `rigidBody.setTranslation` to make the dynamic object
    * interacting with this kinematic body behave as expected. Internally, Rapier will compute
    * an artificial velocity for this rigid-body from its current position and its next kinematic
    * position. This velocity will be used to compute forces on dynamic bodies interacting with
    * this body.
    *
    * # Parameters
    * - `x`: the world-space position of the rigid-body along the `x` axis.
    * - `y`: the world-space position of the rigid-body along the `y` axis.
    * - `z`: the world-space position of the rigid-body along the `z` axis.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    rbSetNextKinematicTranslation(handle, x, y, z) {
        wasm.rawrigidbodyset_rbSetNextKinematicTranslation(this.ptr, handle, x, y, z);
    }
    /**
    * If this rigid body is kinematic, sets its future rotation after the next timestep integration.
    *
    * This should be used instead of `rigidBody.setRotation` to make the dynamic object
    * interacting with this kinematic body behave as expected. Internally, Rapier will compute
    * an artificial velocity for this rigid-body from its current position and its next kinematic
    * position. This velocity will be used to compute forces on dynamic bodies interacting with
    * this body.
    *
    * # Parameters
    * - `x`: the first vector component of the quaternion.
    * - `y`: the second vector component of the quaternion.
    * - `z`: the third vector component of the quaternion.
    * - `w`: the scalar component of the quaternion.
    * @param {number} handle
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    rbSetNextKinematicRotation(handle, x, y, z, w) {
        wasm.rawrigidbodyset_rbSetNextKinematicRotation(this.ptr, handle, x, y, z, w);
    }
    /**
    * The linear velocity of this rigid-body.
    * @param {number} handle
    * @returns {RawVector}
    */
    rbLinvel(handle) {
        var ret = wasm.rawrigidbodyset_rbLinvel(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * The angular velocity of this rigid-body.
    * @param {number} handle
    * @returns {RawVector}
    */
    rbAngvel(handle) {
        var ret = wasm.rawrigidbodyset_rbAngvel(this.ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
    * @param {number} handle
    * @param {boolean} locked
    * @param {boolean} wake_up
    */
    rbLockTranslations(handle, locked, wake_up) {
        wasm.rawrigidbodyset_rbLockRotations(this.ptr, handle, locked, wake_up);
    }
    /**
    * @param {number} handle
    * @param {boolean} locked
    * @param {boolean} wake_up
    */
    rbLockRotations(handle, locked, wake_up) {
        wasm.rawrigidbodyset_rbLockRotations(this.ptr, handle, locked, wake_up);
    }
    /**
    * @param {number} handle
    * @param {boolean} allow_x
    * @param {boolean} allow_y
    * @param {boolean} allow_z
    * @param {boolean} wake_up
    */
    rbRestrictRotations(handle, allow_x, allow_y, allow_z, wake_up) {
        wasm.rawrigidbodyset_rbRestrictRotations(this.ptr, handle, allow_x, allow_y, allow_z, wake_up);
    }
    /**
    * @param {number} handle
    * @returns {number}
    */
    rbDominanceGroup(handle) {
        var ret = wasm.rawrigidbodyset_rbDominanceGroup(this.ptr, handle);
        return ret;
    }
    /**
    * @param {number} handle
    * @param {number} group
    */
    rbSetDominanceGroup(handle, group) {
        wasm.rawrigidbodyset_rbSetDominanceGroup(this.ptr, handle, group);
    }
    /**
    * @param {number} handle
    * @param {boolean} enabled
    */
    rbEnableCcd(handle, enabled) {
        wasm.rawrigidbodyset_rbEnableCcd(this.ptr, handle, enabled);
    }
    /**
    * The mass of this rigid-body.
    * @param {number} handle
    * @returns {number}
    */
    rbMass(handle) {
        var ret = wasm.rawrigidbodyset_rbMass(this.ptr, handle);
        return ret;
    }
    /**
    * Wakes this rigid-body up.
    *
    * A dynamic rigid-body that does not move during several consecutive frames will
    * be put to sleep by the physics engine, i.e., it will stop being simulated in order
    * to avoid useless computations.
    * This methods forces a sleeping rigid-body to wake-up. This is useful, e.g., before modifying
    * the position of a dynamic body so that it is properly simulated afterwards.
    * @param {number} handle
    */
    rbWakeUp(handle) {
        wasm.rawrigidbodyset_rbWakeUp(this.ptr, handle);
    }
    /**
    * Is Continuous Collision Detection enabled for this rigid-body?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsCcdEnabled(handle) {
        var ret = wasm.rawrigidbodyset_rbIsCcdEnabled(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * The number of colliders attached to this rigid-body.
    * @param {number} handle
    * @returns {number}
    */
    rbNumColliders(handle) {
        var ret = wasm.rawrigidbodyset_rbNumColliders(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * Retrieves the `i-th` collider attached to this rigid-body.
    *
    * # Parameters
    * - `at`: The index of the collider to retrieve. Must be a number in `[0, this.numColliders()[`.
    *         This index is **not** the same as the unique identifier of the collider.
    * @param {number} handle
    * @param {number} at
    * @returns {number}
    */
    rbCollider(handle, at) {
        var ret = wasm.rawrigidbodyset_rbCollider(this.ptr, handle, at);
        return ret >>> 0;
    }
    /**
    * The status of this rigid-body: static, dynamic, or kinematic.
    * @param {number} handle
    * @returns {number}
    */
    rbBodyType(handle) {
        var ret = wasm.rawrigidbodyset_rbBodyType(this.ptr, handle);
        return ret >>> 0;
    }
    /**
    * Is this rigid-body static?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsStatic(handle) {
        var ret = wasm.rawrigidbodyset_rbIsStatic(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Is this rigid-body kinematic?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsKinematic(handle) {
        var ret = wasm.rawrigidbodyset_rbIsKinematic(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Is this rigid-body dynamic?
    * @param {number} handle
    * @returns {boolean}
    */
    rbIsDynamic(handle) {
        var ret = wasm.rawrigidbodyset_rbIsDynamic(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * The linear damping coefficient of this rigid-body.
    * @param {number} handle
    * @returns {number}
    */
    rbLinearDamping(handle) {
        var ret = wasm.rawrigidbodyset_rbLinearDamping(this.ptr, handle);
        return ret;
    }
    /**
    * The angular damping coefficient of this rigid-body.
    * @param {number} handle
    * @returns {number}
    */
    rbAngularDamping(handle) {
        var ret = wasm.rawrigidbodyset_rbAngularDamping(this.ptr, handle);
        return ret;
    }
    /**
    * @param {number} handle
    * @param {number} factor
    */
    rbSetLinearDamping(handle, factor) {
        wasm.rawrigidbodyset_rbSetLinearDamping(this.ptr, handle, factor);
    }
    /**
    * @param {number} handle
    * @param {number} factor
    */
    rbSetAngularDamping(handle, factor) {
        wasm.rawrigidbodyset_rbSetAngularDamping(this.ptr, handle, factor);
    }
    /**
    * @param {number} handle
    * @returns {number}
    */
    rbGravityScale(handle) {
        var ret = wasm.rawrigidbodyset_rbGravityScale(this.ptr, handle);
        return ret;
    }
    /**
    * @param {number} handle
    * @param {number} factor
    * @param {boolean} wakeUp
    */
    rbSetGravityScale(handle, factor, wakeUp) {
        wasm.rawrigidbodyset_rbSetGravityScale(this.ptr, handle, factor, wakeUp);
    }
    /**
    * Applies a force at the center-of-mass of this rigid-body.
    *
    * # Parameters
    * - `force`: the world-space force to apply on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} force
    * @param {boolean} wakeUp
    */
    rbApplyForce(handle, force, wakeUp) {
        _assertClass(force, RawVector);
        wasm.rawrigidbodyset_rbApplyForce(this.ptr, handle, force.ptr, wakeUp);
    }
    /**
    * Applies an impulse at the center-of-mass of this rigid-body.
    *
    * # Parameters
    * - `impulse`: the world-space impulse to apply on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} impulse
    * @param {boolean} wakeUp
    */
    rbApplyImpulse(handle, impulse, wakeUp) {
        _assertClass(impulse, RawVector);
        wasm.rawrigidbodyset_rbApplyImpulse(this.ptr, handle, impulse.ptr, wakeUp);
    }
    /**
    * Applies a torque at the center-of-mass of this rigid-body.
    *
    * # Parameters
    * - `torque`: the world-space torque to apply on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} torque
    * @param {boolean} wakeUp
    */
    rbApplyTorque(handle, torque, wakeUp) {
        _assertClass(torque, RawVector);
        wasm.rawrigidbodyset_rbApplyTorque(this.ptr, handle, torque.ptr, wakeUp);
    }
    /**
    * Applies an impulsive torque at the center-of-mass of this rigid-body.
    *
    * # Parameters
    * - `torque impulse`: the world-space torque impulse to apply on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} torque_impulse
    * @param {boolean} wakeUp
    */
    rbApplyTorqueImpulse(handle, torque_impulse, wakeUp) {
        _assertClass(torque_impulse, RawVector);
        wasm.rawrigidbodyset_rbApplyTorqueImpulse(this.ptr, handle, torque_impulse.ptr, wakeUp);
    }
    /**
    * Applies a force at the given world-space point of this rigid-body.
    *
    * # Parameters
    * - `force`: the world-space force to apply on the rigid-body.
    * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} force
    * @param {RawVector} point
    * @param {boolean} wakeUp
    */
    rbApplyForceAtPoint(handle, force, point, wakeUp) {
        _assertClass(force, RawVector);
        _assertClass(point, RawVector);
        wasm.rawrigidbodyset_rbApplyForceAtPoint(this.ptr, handle, force.ptr, point.ptr, wakeUp);
    }
    /**
    * Applies an impulse at the given world-space point of this rigid-body.
    *
    * # Parameters
    * - `impulse`: the world-space impulse to apply on the rigid-body.
    * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
    * - `wakeUp`: should the rigid-body be automatically woken-up?
    * @param {number} handle
    * @param {RawVector} impulse
    * @param {RawVector} point
    * @param {boolean} wakeUp
    */
    rbApplyImpulseAtPoint(handle, impulse, point, wakeUp) {
        _assertClass(impulse, RawVector);
        _assertClass(point, RawVector);
        wasm.rawrigidbodyset_rbApplyImpulseAtPoint(this.ptr, handle, impulse.ptr, point.ptr, wakeUp);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawrigidbodyset_new();
        return RawRigidBodySet.__wrap(ret);
    }
    /**
    * @param {RawVector} translation
    * @param {RawRotation} rotation
    * @param {number} gravityScale
    * @param {number} mass
    * @param {boolean} translationsEnabled
    * @param {RawVector} centerOfMass
    * @param {RawVector} linvel
    * @param {RawVector} angvel
    * @param {RawVector} principalAngularInertia
    * @param {RawRotation} angularInertiaFrame
    * @param {boolean} rotationEnabledX
    * @param {boolean} rotationEnabledY
    * @param {boolean} rotationEnabledZ
    * @param {number} linearDamping
    * @param {number} angularDamping
    * @param {number} rb_type
    * @param {boolean} canSleep
    * @param {boolean} ccdEnabled
    * @param {number} dominanceGroup
    * @returns {number}
    */
    createRigidBody(translation, rotation, gravityScale, mass, translationsEnabled, centerOfMass, linvel, angvel, principalAngularInertia, angularInertiaFrame, rotationEnabledX, rotationEnabledY, rotationEnabledZ, linearDamping, angularDamping, rb_type, canSleep, ccdEnabled, dominanceGroup) {
        _assertClass(translation, RawVector);
        _assertClass(rotation, RawRotation);
        _assertClass(centerOfMass, RawVector);
        _assertClass(linvel, RawVector);
        _assertClass(angvel, RawVector);
        _assertClass(principalAngularInertia, RawVector);
        _assertClass(angularInertiaFrame, RawRotation);
        var ret = wasm.rawrigidbodyset_createRigidBody(this.ptr, translation.ptr, rotation.ptr, gravityScale, mass, translationsEnabled, centerOfMass.ptr, linvel.ptr, angvel.ptr, principalAngularInertia.ptr, angularInertiaFrame.ptr, rotationEnabledX, rotationEnabledY, rotationEnabledZ, linearDamping, angularDamping, rb_type, canSleep, ccdEnabled, dominanceGroup);
        return ret >>> 0;
    }
    /**
    * @param {number} handle
    * @param {RawIslandManager} islands
    * @param {RawColliderSet} colliders
    * @param {RawJointSet} joints
    */
    remove(handle, islands, colliders, joints) {
        _assertClass(islands, RawIslandManager);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawJointSet);
        wasm.rawrigidbodyset_remove(this.ptr, handle, islands.ptr, colliders.ptr, joints.ptr);
    }
    /**
    * The number of rigid-bodies on this set.
    * @returns {number}
    */
    len() {
        var ret = wasm.rawrigidbodyset_len(this.ptr);
        return ret >>> 0;
    }
    /**
    * Checks if a rigid-body with the given integer handle exists.
    * @param {number} handle
    * @returns {boolean}
    */
    contains(handle) {
        var ret = wasm.rawrigidbodyset_contains(this.ptr, handle);
        return ret !== 0;
    }
    /**
    * Applies the given JavaScript function to the integer handle of each rigid-body managed by this set.
    *
    * # Parameters
    * - `f(handle)`: the function to apply to the integer handle of each rigid-body managed by this set. Called as `f(collider)`.
    * @param {Function} f
    */
    forEachRigidBodyHandle(f) {
        try {
            wasm.rawrigidbodyset_forEachRigidBodyHandle(this.ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
module.exports.RawRigidBodySet = RawRigidBodySet;
/**
* A rotation quaternion.
*/
class RawRotation {

    static __wrap(ptr) {
        const obj = Object.create(RawRotation.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawrotation_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    constructor(x, y, z, w) {
        var ret = wasm.rawrotation_new(x, y, z, w);
        return RawRotation.__wrap(ret);
    }
    /**
    * The identity quaternion.
    * @returns {RawRotation}
    */
    static identity() {
        var ret = wasm.rawrotation_identity();
        return RawRotation.__wrap(ret);
    }
    /**
    * The `x` component of this quaternion.
    * @returns {number}
    */
    get x() {
        var ret = wasm.rawintegrationparameters_dt(this.ptr);
        return ret;
    }
    /**
    * The `y` component of this quaternion.
    * @returns {number}
    */
    get y() {
        var ret = wasm.rawrotation_y(this.ptr);
        return ret;
    }
    /**
    * The `z` component of this quaternion.
    * @returns {number}
    */
    get z() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
    /**
    * The `w` component of this quaternion.
    * @returns {number}
    */
    get w() {
        var ret = wasm.rawintegrationparameters_jointErp(this.ptr);
        return ret;
    }
}
module.exports.RawRotation = RawRotation;
/**
*/
class RawSerializationPipeline {

    static __wrap(ptr) {
        const obj = Object.create(RawSerializationPipeline.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawserializationpipeline_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.rawserializationpipeline_new();
        return RawSerializationPipeline.__wrap(ret);
    }
    /**
    * @param {RawVector} gravity
    * @param {RawIntegrationParameters} integrationParameters
    * @param {RawIslandManager} islands
    * @param {RawBroadPhase} broadPhase
    * @param {RawNarrowPhase} narrowPhase
    * @param {RawRigidBodySet} bodies
    * @param {RawColliderSet} colliders
    * @param {RawJointSet} joints
    * @returns {Uint8Array | undefined}
    */
    serializeAll(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, joints) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawJointSet);
        var ret = wasm.rawserializationpipeline_serializeAll(this.ptr, gravity.ptr, integrationParameters.ptr, islands.ptr, broadPhase.ptr, narrowPhase.ptr, bodies.ptr, colliders.ptr, joints.ptr);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {RawDeserializedWorld | undefined}
    */
    deserializeAll(data) {
        var ret = wasm.rawserializationpipeline_deserializeAll(this.ptr, addHeapObject(data));
        return ret === 0 ? undefined : RawDeserializedWorld.__wrap(ret);
    }
}
module.exports.RawSerializationPipeline = RawSerializationPipeline;
/**
*/
class RawShape {

    static __wrap(ptr) {
        const obj = Object.create(RawShape.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawshape_free(ptr);
    }
    /**
    * @param {number} hx
    * @param {number} hy
    * @param {number} hz
    * @returns {RawShape}
    */
    static cuboid(hx, hy, hz) {
        var ret = wasm.rawshape_cuboid(hx, hy, hz);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} hx
    * @param {number} hy
    * @param {number} hz
    * @param {number} borderRadius
    * @returns {RawShape}
    */
    static roundCuboid(hx, hy, hz, borderRadius) {
        var ret = wasm.rawshape_roundCuboid(hx, hy, hz, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} radius
    * @returns {RawShape}
    */
    static ball(radius) {
        var ret = wasm.rawshape_ball(radius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} halfHeight
    * @param {number} radius
    * @returns {RawShape}
    */
    static capsule(halfHeight, radius) {
        var ret = wasm.rawshape_capsule(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} halfHeight
    * @param {number} radius
    * @returns {RawShape}
    */
    static cylinder(halfHeight, radius) {
        var ret = wasm.rawshape_cylinder(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} halfHeight
    * @param {number} radius
    * @param {number} borderRadius
    * @returns {RawShape}
    */
    static roundCylinder(halfHeight, radius, borderRadius) {
        var ret = wasm.rawshape_roundCylinder(halfHeight, radius, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} halfHeight
    * @param {number} radius
    * @returns {RawShape}
    */
    static cone(halfHeight, radius) {
        var ret = wasm.rawshape_cone(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} halfHeight
    * @param {number} radius
    * @param {number} borderRadius
    * @returns {RawShape}
    */
    static roundCone(halfHeight, radius, borderRadius) {
        var ret = wasm.rawshape_roundCone(halfHeight, radius, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} vertices
    * @param {Uint32Array} indices
    * @returns {RawShape}
    */
    static polyline(vertices, indices) {
        var ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_polyline(ptr0, len0, ptr1, len1);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} vertices
    * @param {Uint32Array} indices
    * @returns {RawShape}
    */
    static trimesh(vertices, indices) {
        var ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_trimesh(ptr0, len0, ptr1, len1);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {number} nrows
    * @param {number} ncols
    * @param {Float32Array} heights
    * @param {RawVector} scale
    * @returns {RawShape}
    */
    static heightfield(nrows, ncols, heights, scale) {
        var ptr0 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        _assertClass(scale, RawVector);
        var ret = wasm.rawshape_heightfield(nrows, ncols, ptr0, len0, scale.ptr);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {RawVector} p1
    * @param {RawVector} p2
    * @returns {RawShape}
    */
    static segment(p1, p2) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        var ret = wasm.rawshape_segment(p1.ptr, p2.ptr);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {RawVector} p1
    * @param {RawVector} p2
    * @param {RawVector} p3
    * @returns {RawShape}
    */
    static triangle(p1, p2, p3) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        _assertClass(p3, RawVector);
        var ret = wasm.rawshape_triangle(p1.ptr, p2.ptr, p3.ptr);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {RawVector} p1
    * @param {RawVector} p2
    * @param {RawVector} p3
    * @param {number} borderRadius
    * @returns {RawShape}
    */
    static roundTriangle(p1, p2, p3, borderRadius) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        _assertClass(p3, RawVector);
        var ret = wasm.rawshape_roundTriangle(p1.ptr, p2.ptr, p3.ptr, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} points
    * @returns {RawShape | undefined}
    */
    static convexHull(points) {
        var ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_convexHull(ptr0, len0);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} points
    * @param {number} borderRadius
    * @returns {RawShape | undefined}
    */
    static roundConvexHull(points, borderRadius) {
        var ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_roundConvexHull(ptr0, len0, borderRadius);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} vertices
    * @param {Uint32Array} indices
    * @returns {RawShape | undefined}
    */
    static convexMesh(vertices, indices) {
        var ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_convexMesh(ptr0, len0, ptr1, len1);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
    * @param {Float32Array} vertices
    * @param {Uint32Array} indices
    * @param {number} borderRadius
    * @returns {RawShape | undefined}
    */
    static roundConvexMesh(vertices, indices, borderRadius) {
        var ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.rawshape_roundConvexMesh(ptr0, len0, ptr1, len1, borderRadius);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
}
module.exports.RawShape = RawShape;
/**
*/
class RawShapeColliderTOI {

    static __wrap(ptr) {
        const obj = Object.create(RawShapeColliderTOI.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawshapecollidertoi_free(ptr);
    }
    /**
    * @returns {number}
    */
    colliderHandle() {
        var ret = wasm.rawpointcolliderprojection_colliderHandle(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    toi() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
    /**
    * @returns {RawVector}
    */
    witness1() {
        var ret = wasm.rawraycolliderintersection_normal(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {RawVector}
    */
    witness2() {
        var ret = wasm.rawraycolliderintersection_normal(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {RawVector}
    */
    normal1() {
        var ret = wasm.rawshapecollidertoi_normal1(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * @returns {RawVector}
    */
    normal2() {
        var ret = wasm.rawshapecollidertoi_normal1(this.ptr);
        return RawVector.__wrap(ret);
    }
}
module.exports.RawShapeColliderTOI = RawShapeColliderTOI;
/**
* A vector.
*/
class RawVector {

    static __wrap(ptr) {
        const obj = Object.create(RawVector.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawvector_free(ptr);
    }
    /**
    * Creates a new vector filled with zeros.
    * @returns {RawVector}
    */
    static zero() {
        var ret = wasm.rawvector_zero();
        return RawVector.__wrap(ret);
    }
    /**
    * Creates a new 3D vector from its two components.
    *
    * # Parameters
    * - `x`: the `x` component of this 3D vector.
    * - `y`: the `y` component of this 3D vector.
    * - `z`: the `z` component of this 3D vector.
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    constructor(x, y, z) {
        var ret = wasm.rawvector_new(x, y, z);
        return RawVector.__wrap(ret);
    }
    /**
    * The `x` component of this vector.
    * @returns {number}
    */
    get x() {
        var ret = wasm.rawintegrationparameters_dt(this.ptr);
        return ret;
    }
    /**
    * Sets the `x` component of this vector.
    * @param {number} x
    */
    set x(x) {
        wasm.rawintegrationparameters_set_dt(this.ptr, x);
    }
    /**
    * The `y` component of this vector.
    * @returns {number}
    */
    get y() {
        var ret = wasm.rawrotation_y(this.ptr);
        return ret;
    }
    /**
    * Sets the `y` component of this vector.
    * @param {number} y
    */
    set y(y) {
        wasm.rawvector_set_y(this.ptr, y);
    }
    /**
    * The `z` component of this vector.
    * @returns {number}
    */
    get z() {
        var ret = wasm.rawintegrationparameters_erp(this.ptr);
        return ret;
    }
    /**
    * Sets the `z` component of this vector.
    * @param {number} z
    */
    set z(z) {
        wasm.rawintegrationparameters_set_erp(this.ptr, z);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{x, y, z}`.
    *
    * This will effectively return a copy of `this`. This method exist for completeness with the
    * other swizzling functions.
    * @returns {RawVector}
    */
    xyz() {
        var ret = wasm.rawvector_xyz(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{y, x, z}`.
    * @returns {RawVector}
    */
    yxz() {
        var ret = wasm.rawvector_yxz(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{z, x, y}`.
    * @returns {RawVector}
    */
    zxy() {
        var ret = wasm.rawvector_zxy(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{x, z, y}`.
    * @returns {RawVector}
    */
    xzy() {
        var ret = wasm.rawvector_xzy(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{y, z, x}`.
    * @returns {RawVector}
    */
    yzx() {
        var ret = wasm.rawvector_yzx(this.ptr);
        return RawVector.__wrap(ret);
    }
    /**
    * Create a new 3D vector from this vector with its components rearranged as `{z, y, x}`.
    * @returns {RawVector}
    */
    zyx() {
        var ret = wasm.rawvector_zyx(this.ptr);
        return RawVector.__wrap(ret);
    }
}
module.exports.RawVector = RawVector;

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_number_new = function(arg0) {
    var ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbg_rawraycolliderintersection_new = function(arg0) {
    var ret = RawRayColliderIntersection.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_now_885ca88fafee0fd1 = function(arg0) {
    var ret = getObject(arg0).now();
    return ret;
};

module.exports.__wbg_newnoargs_1a11e7e8c906996c = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_get_6d26c712aa73c8b2 = function() { return handleError(function (arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_e91f71ddf1f45cff = function() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_call_e3c72355d091d5d4 = function() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_c143b19d87139944 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_72facd37dbc97ddb = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_bind_07839579f523aa89 = function(arg0, arg1, arg2, arg3) {
    var ret = getObject(arg0).bind(getObject(arg1), getObject(arg2), getObject(arg3));
    return addHeapObject(ret);
};

module.exports.__wbg_buffer_79a3294266d4e783 = function(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_self_b4546ea7b590539e = function() { return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_window_c279fea81f426a68 = function() { return handleError(function () {
    var ret = window.window;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_globalThis_038a6ea0ff17789f = function() { return handleError(function () {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_global_4f93ce884bcee597 = function() { return handleError(function () {
    var ret = global.global;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbg_newwithbyteoffsetandlength_22a36e6023ad3cd0 = function(arg0, arg1, arg2) {
    var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_945397fb09fec0b8 = function(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_223873223acf6d07 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_length_68e13e7bbd918464 = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

module.exports.__wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function() {
    var ret = wasm.memory;
    return addHeapObject(ret);
};

const path = require('path').join(__dirname, 'rapier_wasm3d_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

