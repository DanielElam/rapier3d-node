"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JointParams = exports.RevoluteJoint = exports.BallJoint = exports.PrismaticJoint = exports.FixedJoint = exports.UnitJoint = exports.Joint = exports.SpringModel = exports.JointType = void 0;
const math_1 = require("../math");
const raw_1 = require("../raw");
/**
 * An enum grouping all possible types of joints:
 * - `Ball`: A Ball joint that removes all relative linear degrees of freedom between the affected bodies.
 * - `Fixed`: A fixed joint that removes all relative degrees of freedom between the affected bodies.
 * - `Prismatic`: A prismatic joint that removes all degrees of freedom between the affected
 *                bodies except for the translation along one axis.
 * - `Revolute`: (3D only) A revolute joint that removes all degrees of freedom between the affected
 *               bodies except for the rotation along one axis.
 */
var JointType;
(function (JointType) {
    JointType[JointType["Ball"] = 0] = "Ball";
    JointType[JointType["Fixed"] = 1] = "Fixed";
    JointType[JointType["Prismatic"] = 2] = "Prismatic";
    // #if DIM3
    JointType[JointType["Revolute"] = 3] = "Revolute";
    // #endif
})(JointType = exports.JointType || (exports.JointType = {}));
var SpringModel;
(function (SpringModel) {
    SpringModel[SpringModel["Disabled"] = 0] = "Disabled";
    SpringModel[SpringModel["VelocityBased"] = 1] = "VelocityBased";
    SpringModel[SpringModel["AccelerationBased"] = 2] = "AccelerationBased";
    SpringModel[SpringModel["ForceBased"] = 3] = "ForceBased";
})(SpringModel = exports.SpringModel || (exports.SpringModel = {}));
class Joint {
    constructor(rawSet, handle) {
        this.rawSet = rawSet;
        this.handle = handle;
    }
    /**
     * Checks if this joint is still valid (i.e. that it has
     * not been deleted from the joint set yet).
     */
    isValid() {
        return this.rawSet.contains(this.handle);
    }
    /**
     * The unique integer identifier of the first rigid-body this joint it attached to.
     */
    bodyHandle1() {
        return this.rawSet.jointBodyHandle1(this.handle);
    }
    /**
     * The unique integer identifier of the second rigid-body this joint is attached to.
     */
    bodyHandle2() {
        return this.rawSet.jointBodyHandle2(this.handle);
    }
    /**
     * The type of this joint given as a string.
     */
    type() {
        return this.rawSet.jointType(this.handle);
    }
    // #if DIM3
    /**
     * The rotation quaternion that aligns this joint's first local axis to the `x` axis.
     */
    frameX1() {
        return math_1.RotationOps.fromRaw(this.rawSet.jointFrameX1(this.handle));
    }
    // #endif
    // #if DIM3
    /**
     * The rotation matrix that aligns this joint's second local axis to the `x` axis.
     */
    frameX2() {
        return math_1.RotationOps.fromRaw(this.rawSet.jointFrameX2(this.handle));
    }
    // #endif
    /**
     * The position of the first anchor of this joint.
     *
     * The first anchor gives the position of the points application point on the
     * local frame of the first rigid-body it is attached to.
     */
    anchor1() {
        return math_1.VectorOps.fromRaw(this.rawSet.jointAnchor1(this.handle));
    }
    /**
     * The position of the second anchor of this joint.
     *
     * The second anchor gives the position of the points application point on the
     * local frame of the second rigid-body it is attached to.
     */
    anchor2() {
        return math_1.VectorOps.fromRaw(this.rawSet.jointAnchor2(this.handle));
    }
    /**
     * The first axis of this joint, if any.
     *
     * For joints where an application axis makes sense (e.g. the revolute and prismatic joins),
     * this returns the application axis on the first rigid-body this joint is attached to, expressed
     * in the local-space of this first rigid-body.
     */
    axis1() {
        return math_1.VectorOps.fromRaw(this.rawSet.jointAxis1(this.handle));
    }
    /**
     * The second axis of this joint, if any.
     *
     * For joints where an application axis makes sense (e.g. the revolute and prismatic joins),
     * this returns the application axis on the second rigid-body this joint is attached to, expressed
     * in the local-space of this second rigid-body.
     */
    axis2() {
        return math_1.VectorOps.fromRaw(this.rawSet.jointAxis2(this.handle));
    }
}
exports.Joint = Joint;
class UnitJoint extends Joint {
    /**
     * Are the limits enabled for this joint?
     */
    limitsEnabled() {
        return this.rawSet.jointLimitsEnabled(this.handle);
    }
    /**
     * The min limit of this joint.
     */
    limitsMin() {
        return this.rawSet.jointLimitsMin(this.handle);
    }
    /**
     * The max limit of this joint.
     */
    limitsMax() {
        return this.rawSet.jointLimitsMax(this.handle);
    }
    configureMotorModel(model) {
        this.rawSet.jointConfigureMotorModel(this.handle, model);
    }
    configureMotorVelocity(targetVel, factor) {
        this.rawSet.jointConfigureUnitMotorVelocity(this.handle, targetVel, factor);
    }
    configureMotorPosition(targetPos, stiffness, damping) {
        this.rawSet.jointConfigureUnitMotorPosition(this.handle, targetPos, stiffness, damping);
    }
    configureMotor(targetPos, targetVel, stiffness, damping) {
        this.rawSet.jointConfigureUnitMotor(this.handle, targetPos, targetVel, stiffness, damping);
    }
}
exports.UnitJoint = UnitJoint;
class FixedJoint extends Joint {
}
exports.FixedJoint = FixedJoint;
class PrismaticJoint extends UnitJoint {
}
exports.PrismaticJoint = PrismaticJoint;
// #if DIM3
class BallJoint extends Joint {
    configureMotorModel(model) {
        this.rawSet.jointConfigureMotorModel(this.handle, model);
    }
    configureMotorVelocity(targetVel, factor) {
        this.rawSet.jointConfigureBallMotorVelocity(this.handle, targetVel.x, targetVel.y, targetVel.z, factor);
    }
    configureMotorPosition(targetPos, stiffness, damping) {
        this.rawSet.jointConfigureBallMotorPosition(this.handle, targetPos.w, targetPos.x, targetPos.y, targetPos.z, stiffness, damping);
    }
    configureMotor(targetPos, targetVel, stiffness, damping) {
        this.rawSet.jointConfigureBallMotor(this.handle, targetPos.w, targetPos.x, targetPos.y, targetPos.z, targetVel.x, targetVel.y, targetVel.z, stiffness, damping);
    }
}
exports.BallJoint = BallJoint;
class RevoluteJoint extends UnitJoint {
}
exports.RevoluteJoint = RevoluteJoint;
// #endif
class JointParams {
    constructor() {
    }
    /**
     * Create a new joint descriptor that builds Ball joints.
     *
     * A ball joints allows three relative rotational degrees of freedom
     * by preventing any relative translation between the anchors of the
     * two attached rigid-bodies.
     *
     * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     */
    static ball(anchor1, anchor2) {
        let res = new JointParams();
        res.anchor1 = anchor1;
        res.anchor2 = anchor2;
        res.jointType = JointType.Ball;
        return res;
    }
    /**
     * Creates a new joint descriptor that builds a Fixed joint.
     *
     * A fixed joint removes all the degrees of freedom between the affected bodies, ensuring their
     * anchor and local frames coincide in world-space.
     *
     * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param frame1 - The reference orientation of the joint wrt. the first rigid-body.
     * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param frame2 - The reference orientation of the joint wrt. the second rigid-body.
     */
    static fixed(anchor1, frame1, anchor2, frame2) {
        let res = new JointParams();
        res.anchor1 = anchor1;
        res.anchor2 = anchor2;
        res.frame1 = frame1;
        res.frame2 = frame2;
        res.jointType = JointType.Fixed;
        return res;
    }
    // #if DIM3
    /**
     * Creates a new joint descriptor that builds a Prismatic joint.
     *
     * A prismatic joint removes all the degrees of freedom between the
     * affected bodies, except for the translation along one axis.
     *
     * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param axis1 - Axis of the joint, expressed in the local-space of the first rigid-body it is attached to.
     * @param tangent1 - A vector orthogonal to `axis1`. It is used to compute a basis orthonormal
     *                   to the joint's axis. If this tangent is set to the zero vector, the orthonormal
     *                   basis will be automatically computed arbitrarily.
     * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param axis2 - Axis of the joint, expressed in the local-space of the second rigid-body it is attached to.
     * @param tangent2 - A vector orthogonal to `axis2`. It is used to compute a basis orthonormal
     *                   to the joint's axis. If this tangent is set to the zero vector, the orthonormal
     *                   basis will be automatically computed arbitrarily.
     */
    static prismatic(anchor1, axis1, tangent1, anchor2, axis2, tangent2) {
        let res = new JointParams();
        res.anchor1 = anchor1;
        res.axis1 = axis1;
        res.tangent1 = tangent1;
        res.anchor2 = anchor2;
        res.axis2 = axis2;
        res.tangent2 = tangent2;
        res.jointType = JointType.Prismatic;
        return res;
    }
    /**
     * Create a new joint descriptor that builds Revolute joints.
     *
     * A revolute joint removes all degrees of freedom between the affected
     * bodies except for the rotation along one axis.
     *
     * @param anchor1 - Point where the joint is attached on the first rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param axis1 - Axis of the joint, expressed in the local-space of the first rigid-body it is attached to.
     * @param anchor2 - Point where the joint is attached on the second rigid-body affected by this joint. Expressed in the
     *                  local-space of the rigid-body.
     * @param axis2 - Axis of the joint, expressed in the local-space of the second rigid-body it is attached to.
     */
    static revolute(anchor1, axis1, anchor2, axis2) {
        let res = new JointParams();
        res.anchor1 = anchor1;
        res.anchor2 = anchor2;
        res.axis1 = axis1;
        res.axis2 = axis2;
        res.jointType = JointType.Revolute;
        return res;
    }
    // #endif
    intoRaw() {
        let rawA1 = math_1.VectorOps.intoRaw(this.anchor1);
        let rawA2 = math_1.VectorOps.intoRaw(this.anchor2);
        let rawAx1;
        let rawAx2;
        let result;
        let limitsEnabled = false;
        let limitsMin = 0.0;
        let limitsMax = 0.0;
        switch (this.jointType) {
            case JointType.Ball:
                result = raw_1.RawJointParams.ball(rawA1, rawA2);
                break;
            case JointType.Fixed:
                let rawFra1 = math_1.RotationOps.intoRaw(this.frame1);
                let rawFra2 = math_1.RotationOps.intoRaw(this.frame2);
                result = raw_1.RawJointParams.fixed(rawA1, rawFra1, rawA2, rawFra2);
                rawFra1.free();
                rawFra2.free();
                break;
            case JointType.Prismatic:
                rawAx1 = math_1.VectorOps.intoRaw(this.axis1);
                rawAx2 = math_1.VectorOps.intoRaw(this.axis2);
                if (!!this.limitsEnabled) {
                    limitsEnabled = true;
                    limitsMin = this.limits[0];
                    limitsMax = this.limits[1];
                }
                // #if DIM3
                let rawTa1 = math_1.VectorOps.intoRaw(this.tangent1);
                let rawTa2 = math_1.VectorOps.intoRaw(this.tangent2);
                result = raw_1.RawJointParams.prismatic(rawA1, rawAx1, rawTa1, rawA2, rawAx2, rawTa2, limitsEnabled, limitsMin, limitsMax);
                rawTa1.free();
                rawTa2.free();
                // #endif
                rawAx1.free();
                rawAx2.free();
                break;
            // #if DIM3
            case JointType.Revolute:
                rawAx1 = math_1.VectorOps.intoRaw(this.axis1);
                rawAx2 = math_1.VectorOps.intoRaw(this.axis2);
                result = raw_1.RawJointParams.revolute(rawA1, rawAx1, rawA2, rawAx2);
                rawAx1.free();
                rawAx2.free();
                break;
            // #endif
        }
        rawA1.free();
        rawA2.free();
        return result;
    }
}
exports.JointParams = JointParams;
//# sourceMappingURL=joint.js.map