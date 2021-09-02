/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function version(a: number): void;
export function __wbg_rawccdsolver_free(a: number): void;
export function rawccdsolver_new(): number;
export function __wbg_rawintegrationparameters_free(a: number): void;
export function rawintegrationparameters_new(): number;
export function rawintegrationparameters_dt(a: number): number;
export function rawintegrationparameters_erp(a: number): number;
export function rawintegrationparameters_jointErp(a: number): number;
export function rawintegrationparameters_warmstartCoeff(a: number): number;
export function rawintegrationparameters_allowedLinearError(a: number): number;
export function rawintegrationparameters_predictionDistance(a: number): number;
export function rawintegrationparameters_allowedAngularError(a: number): number;
export function rawintegrationparameters_maxLinearCorrection(a: number): number;
export function rawintegrationparameters_maxAngularCorrection(a: number): number;
export function rawintegrationparameters_maxVelocityIterations(a: number): number;
export function rawintegrationparameters_maxPositionIterations(a: number): number;
export function rawintegrationparameters_minIslandSize(a: number): number;
export function rawintegrationparameters_maxCcdSubsteps(a: number): number;
export function rawintegrationparameters_set_dt(a: number, b: number): void;
export function rawintegrationparameters_set_erp(a: number, b: number): void;
export function rawintegrationparameters_set_jointErp(a: number, b: number): void;
export function rawintegrationparameters_set_warmstartCoeff(a: number, b: number): void;
export function rawintegrationparameters_set_allowedLinearError(a: number, b: number): void;
export function rawintegrationparameters_set_predictionDistance(a: number, b: number): void;
export function rawintegrationparameters_set_allowedAngularError(a: number, b: number): void;
export function rawintegrationparameters_set_maxLinearCorrection(a: number, b: number): void;
export function rawintegrationparameters_set_maxAngularCorrection(a: number, b: number): void;
export function rawintegrationparameters_set_maxVelocityIterations(a: number, b: number): void;
export function rawintegrationparameters_set_maxPositionIterations(a: number, b: number): void;
export function rawintegrationparameters_set_minIslandSize(a: number, b: number): void;
export function rawintegrationparameters_set_maxCcdSubsteps(a: number, b: number): void;
export function __wbg_rawislandmanager_free(a: number): void;
export function rawislandmanager_new(): number;
export function rawislandmanager_forEachActiveRigidBodyHandle(a: number, b: number): void;
export function rawjointset_jointBodyHandle1(a: number, b: number): number;
export function rawjointset_jointBodyHandle2(a: number, b: number): number;
export function rawjointset_jointType(a: number, b: number): number;
export function rawjointset_jointFrameX1(a: number, b: number): number;
export function rawjointset_jointFrameX2(a: number, b: number): number;
export function rawjointset_jointAnchor1(a: number, b: number): number;
export function rawjointset_jointAnchor2(a: number, b: number): number;
export function rawjointset_jointAxis1(a: number, b: number): number;
export function rawjointset_jointAxis2(a: number, b: number): number;
export function rawjointset_jointLimitsEnabled(a: number, b: number): number;
export function rawjointset_jointLimitsMin(a: number, b: number): number;
export function rawjointset_jointLimitsMax(a: number, b: number): number;
export function rawjointset_jointConfigureMotorModel(a: number, b: number, c: number): void;
export function rawjointset_jointConfigureBallMotorVelocity(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawjointset_jointConfigureBallMotorPosition(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): void;
export function rawjointset_jointConfigureBallMotor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number): void;
export function rawjointset_jointConfigureUnitMotorVelocity(a: number, b: number, c: number, d: number): void;
export function rawjointset_jointConfigureUnitMotorPosition(a: number, b: number, c: number, d: number, e: number): void;
export function rawjointset_jointConfigureUnitMotor(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function __wbg_rawjointparams_free(a: number): void;
export function rawjointparams_ball(a: number, b: number): number;
export function rawjointparams_prismatic(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function rawjointparams_fixed(a: number, b: number, c: number, d: number): number;
export function rawjointparams_revolute(a: number, b: number, c: number, d: number): number;
export function __wbg_rawjointset_free(a: number): void;
export function rawjointset_new(): number;
export function rawjointset_createJoint(a: number, b: number, c: number, d: number, e: number): number;
export function rawjointset_remove(a: number, b: number, c: number, d: number, e: number): void;
export function rawjointset_len(a: number): number;
export function rawjointset_contains(a: number, b: number): number;
export function rawjointset_forEachJointHandle(a: number, b: number): void;
export function rawrigidbodyset_rbTranslation(a: number, b: number): number;
export function rawrigidbodyset_rbRotation(a: number, b: number): number;
export function rawrigidbodyset_rbSleep(a: number, b: number): void;
export function rawrigidbodyset_rbIsSleeping(a: number, b: number): number;
export function rawrigidbodyset_rbIsMoving(a: number, b: number): number;
export function rawrigidbodyset_rbNextTranslation(a: number, b: number): number;
export function rawrigidbodyset_rbNextRotation(a: number, b: number): number;
export function rawrigidbodyset_rbSetTranslation(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawrigidbodyset_rbSetRotation(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function rawrigidbodyset_rbSetLinvel(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbSetAngvel(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbSetNextKinematicTranslation(a: number, b: number, c: number, d: number, e: number): void;
export function rawrigidbodyset_rbSetNextKinematicRotation(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawrigidbodyset_rbLinvel(a: number, b: number): number;
export function rawrigidbodyset_rbAngvel(a: number, b: number): number;
export function rawrigidbodyset_rbLockRotations(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbRestrictRotations(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawrigidbodyset_rbDominanceGroup(a: number, b: number): number;
export function rawrigidbodyset_rbSetDominanceGroup(a: number, b: number, c: number): void;
export function rawrigidbodyset_rbEnableCcd(a: number, b: number, c: number): void;
export function rawrigidbodyset_rbMass(a: number, b: number): number;
export function rawrigidbodyset_rbWakeUp(a: number, b: number): void;
export function rawrigidbodyset_rbIsCcdEnabled(a: number, b: number): number;
export function rawrigidbodyset_rbNumColliders(a: number, b: number): number;
export function rawrigidbodyset_rbCollider(a: number, b: number, c: number): number;
export function rawrigidbodyset_rbBodyType(a: number, b: number): number;
export function rawrigidbodyset_rbIsStatic(a: number, b: number): number;
export function rawrigidbodyset_rbIsKinematic(a: number, b: number): number;
export function rawrigidbodyset_rbIsDynamic(a: number, b: number): number;
export function rawrigidbodyset_rbLinearDamping(a: number, b: number): number;
export function rawrigidbodyset_rbAngularDamping(a: number, b: number): number;
export function rawrigidbodyset_rbSetLinearDamping(a: number, b: number, c: number): void;
export function rawrigidbodyset_rbSetAngularDamping(a: number, b: number, c: number): void;
export function rawrigidbodyset_rbGravityScale(a: number, b: number): number;
export function rawrigidbodyset_rbSetGravityScale(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbApplyForce(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbApplyImpulse(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbApplyTorque(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbApplyTorqueImpulse(a: number, b: number, c: number, d: number): void;
export function rawrigidbodyset_rbApplyForceAtPoint(a: number, b: number, c: number, d: number, e: number): void;
export function rawrigidbodyset_rbApplyImpulseAtPoint(a: number, b: number, c: number, d: number, e: number): void;
export function __wbg_rawrigidbodyset_free(a: number): void;
export function rawrigidbodyset_new(): number;
export function rawrigidbodyset_createRigidBody(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number): number;
export function rawrigidbodyset_remove(a: number, b: number, c: number, d: number, e: number): void;
export function rawrigidbodyset_len(a: number): number;
export function rawrigidbodyset_contains(a: number, b: number): number;
export function rawrigidbodyset_forEachRigidBodyHandle(a: number, b: number): void;
export function __wbg_rawbroadphase_free(a: number): void;
export function rawbroadphase_new(): number;
export function rawcolliderset_coTranslation(a: number, b: number): number;
export function rawcolliderset_coRotation(a: number, b: number): number;
export function rawcolliderset_coSetTranslation(a: number, b: number, c: number, d: number, e: number): void;
export function rawcolliderset_coSetTranslationWrtParent(a: number, b: number, c: number, d: number, e: number): void;
export function rawcolliderset_coSetRotation(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawcolliderset_coSetRotationWrtParent(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rawcolliderset_coIsSensor(a: number, b: number): number;
export function rawcolliderset_coShapeType(a: number, b: number): number;
export function rawcolliderset_coHalfExtents(a: number, b: number): number;
export function rawcolliderset_coRadius(a: number, b: number, c: number): void;
export function rawcolliderset_coHalfHeight(a: number, b: number, c: number): void;
export function rawcolliderset_coRoundRadius(a: number, b: number, c: number): void;
export function rawcolliderset_coVertices(a: number, b: number, c: number): void;
export function rawcolliderset_coIndices(a: number, b: number, c: number): void;
export function rawcolliderset_coHeightfieldHeights(a: number, b: number, c: number): void;
export function rawcolliderset_coHeightfieldScale(a: number, b: number): number;
export function rawcolliderset_coHeightfieldNRows(a: number, b: number, c: number): void;
export function rawcolliderset_coHeightfieldNCols(a: number, b: number, c: number): void;
export function rawcolliderset_coParent(a: number, b: number): number;
export function rawcolliderset_coFriction(a: number, b: number): number;
export function rawcolliderset_coDensity(a: number, b: number, c: number): void;
export function rawcolliderset_coCollisionGroups(a: number, b: number): number;
export function rawcolliderset_coSolverGroups(a: number, b: number): number;
export function rawcolliderset_coActiveHooks(a: number, b: number): number;
export function rawcolliderset_coActiveCollisionTypes(a: number, b: number): number;
export function rawcolliderset_coActiveEvents(a: number, b: number): number;
export function rawcolliderset_coSetSensor(a: number, b: number, c: number): void;
export function rawcolliderset_coSetRestitution(a: number, b: number, c: number): void;
export function rawcolliderset_coSetFriction(a: number, b: number, c: number): void;
export function rawcolliderset_coFrictionCombineRule(a: number, b: number): number;
export function rawcolliderset_coSetFrictionCombineRule(a: number, b: number, c: number): void;
export function rawcolliderset_coRestitutionCombineRule(a: number, b: number): number;
export function rawcolliderset_coSetRestitutionCombineRule(a: number, b: number, c: number): void;
export function rawcolliderset_coSetCollisionGroups(a: number, b: number, c: number): void;
export function rawcolliderset_coSetSolverGroups(a: number, b: number, c: number): void;
export function rawcolliderset_coSetActiveHooks(a: number, b: number, c: number): void;
export function rawcolliderset_coSetActiveEvents(a: number, b: number, c: number): void;
export function rawcolliderset_coSetActiveCollisionTypes(a: number, b: number, c: number): void;
export function rawcolliderset_coSetShape(a: number, b: number, c: number): void;
export function __wbg_rawcolliderset_free(a: number): void;
export function rawcolliderset_new(): number;
export function rawcolliderset_len(a: number): number;
export function rawcolliderset_contains(a: number, b: number): number;
export function rawcolliderset_createCollider(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number, v: number, w: number, x: number): void;
export function rawcolliderset_remove(a: number, b: number, c: number, d: number, e: number): void;
export function rawcolliderset_forEachColliderHandle(a: number, b: number): void;
export function __wbg_rawnarrowphase_free(a: number): void;
export function rawnarrowphase_new(): number;
export function rawnarrowphase_contacts_with(a: number, b: number, c: number): void;
export function rawnarrowphase_contact_pair(a: number, b: number, c: number): number;
export function rawnarrowphase_intersections_with(a: number, b: number, c: number): void;
export function rawnarrowphase_intersection_pair(a: number, b: number, c: number): number;
export function __wbg_rawcontactmanifold_free(a: number): void;
export function rawcontactpair_collider1(a: number): number;
export function rawcontactpair_collider2(a: number): number;
export function rawcontactpair_numContactManifolds(a: number): number;
export function rawcontactpair_contactManifold(a: number, b: number): number;
export function rawcontactmanifold_normal(a: number): number;
export function rawcontactmanifold_local_n1(a: number): number;
export function rawcontactmanifold_subshape1(a: number): number;
export function rawcontactmanifold_num_contacts(a: number): number;
export function rawcontactmanifold_contact_local_p1(a: number, b: number): number;
export function rawcontactmanifold_contact_dist(a: number, b: number): number;
export function rawcontactmanifold_contact_fid1(a: number, b: number): number;
export function rawcontactmanifold_contact_fid2(a: number, b: number): number;
export function rawcontactmanifold_contact_impulse(a: number, b: number): number;
export function rawcontactmanifold_contact_tangent_impulse_x(a: number, b: number): number;
export function rawcontactmanifold_contact_tangent_impulse_y(a: number, b: number): number;
export function rawcontactmanifold_num_solver_contacts(a: number): number;
export function rawcontactmanifold_solver_contact_point(a: number, b: number): number;
export function rawcontactmanifold_solver_contact_dist(a: number, b: number): number;
export function rawcontactmanifold_solver_contact_friction(a: number, b: number): number;
export function rawcontactmanifold_solver_contact_restitution(a: number, b: number): number;
export function rawcontactmanifold_solver_contact_tangent_velocity(a: number, b: number): number;
export function __wbg_rawpointcolliderprojection_free(a: number): void;
export function rawpointcolliderprojection_colliderHandle(a: number): number;
export function rawpointcolliderprojection_point(a: number): number;
export function rawpointcolliderprojection_isInside(a: number): number;
export function __wbg_rawraycolliderintersection_free(a: number): void;
export function rawraycolliderintersection_normal(a: number): number;
export function __wbg_rawraycollidertoi_free(a: number): void;
export function __wbg_rawshape_free(a: number): void;
export function rawshape_cuboid(a: number, b: number, c: number): number;
export function rawshape_roundCuboid(a: number, b: number, c: number, d: number): number;
export function rawshape_ball(a: number): number;
export function rawshape_capsule(a: number, b: number): number;
export function rawshape_cylinder(a: number, b: number): number;
export function rawshape_roundCylinder(a: number, b: number, c: number): number;
export function rawshape_cone(a: number, b: number): number;
export function rawshape_roundCone(a: number, b: number, c: number): number;
export function rawshape_polyline(a: number, b: number, c: number, d: number): number;
export function rawshape_trimesh(a: number, b: number, c: number, d: number): number;
export function rawshape_heightfield(a: number, b: number, c: number, d: number, e: number): number;
export function rawshape_segment(a: number, b: number): number;
export function rawshape_triangle(a: number, b: number, c: number): number;
export function rawshape_roundTriangle(a: number, b: number, c: number, d: number): number;
export function rawshape_convexHull(a: number, b: number): number;
export function rawshape_roundConvexHull(a: number, b: number, c: number): number;
export function rawshape_convexMesh(a: number, b: number, c: number, d: number): number;
export function rawshape_roundConvexMesh(a: number, b: number, c: number, d: number, e: number): number;
export function __wbg_rawshapecollidertoi_free(a: number): void;
export function rawshapecollidertoi_normal1(a: number): number;
export function __wbg_rawrotation_free(a: number): void;
export function rawrotation_new(a: number, b: number, c: number, d: number): number;
export function rawrotation_identity(): number;
export function rawrotation_y(a: number): number;
export function rawvector_zero(): number;
export function rawvector_new(a: number, b: number, c: number): number;
export function rawvector_set_y(a: number, b: number): void;
export function rawvector_xyz(a: number): number;
export function rawvector_yxz(a: number): number;
export function rawvector_zxy(a: number): number;
export function rawvector_xzy(a: number): number;
export function rawvector_yzx(a: number): number;
export function rawvector_zyx(a: number): number;
export function __wbg_raweventqueue_free(a: number): void;
export function raweventqueue_new(a: number): number;
export function raweventqueue_drainContactEvents(a: number, b: number): void;
export function raweventqueue_drainIntersectionEvents(a: number, b: number): void;
export function raweventqueue_clear(a: number): void;
export function __wbg_rawphysicspipeline_free(a: number): void;
export function rawphysicspipeline_new(): number;
export function rawphysicspipeline_step(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): void;
export function rawphysicspipeline_stepWithEvents(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number): void;
export function __wbg_rawquerypipeline_free(a: number): void;
export function rawquerypipeline_new(): number;
export function rawquerypipeline_update(a: number, b: number, c: number, d: number): void;
export function rawquerypipeline_castRay(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function rawquerypipeline_castRayAndGetNormal(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function rawquerypipeline_intersectionsWithRay(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): void;
export function rawquerypipeline_intersectionWithShape(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function rawquerypipeline_projectPoint(a: number, b: number, c: number, d: number, e: number): number;
export function rawquerypipeline_intersectionsWithPoint(a: number, b: number, c: number, d: number, e: number): void;
export function rawquerypipeline_castShape(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function rawquerypipeline_intersectionsWithShape(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function rawquerypipeline_collidersWithAabbIntersectingAabb(a: number, b: number, c: number, d: number): void;
export function __wbg_rawdeserializedworld_free(a: number): void;
export function rawdeserializedworld_takeGravity(a: number): number;
export function rawdeserializedworld_takeIntegrationParameters(a: number): number;
export function rawdeserializedworld_takeIslandManager(a: number): number;
export function rawdeserializedworld_takeBroadPhase(a: number): number;
export function rawdeserializedworld_takeNarrowPhase(a: number): number;
export function rawdeserializedworld_takeBodies(a: number): number;
export function rawdeserializedworld_takeColliders(a: number): number;
export function rawdeserializedworld_takeJoints(a: number): number;
export function rawserializationpipeline_serializeAll(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function rawserializationpipeline_deserializeAll(a: number, b: number): number;
export function __wbg_rawcontactpair_free(a: number): void;
export function __wbg_rawvector_free(a: number): void;
export function rawshapecollidertoi_witness1(a: number): number;
export function rawshapecollidertoi_witness2(a: number): number;
export function rawshapecollidertoi_normal2(a: number): number;
export function rawcontactmanifold_subshape2(a: number): number;
export function rawserializationpipeline_new(): number;
export function rawcontactmanifold_contact_local_p2(a: number, b: number): number;
export function rawrigidbodyset_rbLockTranslations(a: number, b: number, c: number, d: number): void;
export function rawcontactmanifold_local_n2(a: number): number;
export function rawraycolliderintersection_colliderHandle(a: number): number;
export function rawraycollidertoi_colliderHandle(a: number): number;
export function rawshapecollidertoi_colliderHandle(a: number): number;
export function __wbg_rawserializationpipeline_free(a: number): void;
export function rawvector_set_x(a: number, b: number): void;
export function rawvector_set_z(a: number, b: number): void;
export function rawcolliderset_isHandleValid(a: number, b: number): number;
export function rawraycolliderintersection_toi(a: number): number;
export function rawraycollidertoi_toi(a: number): number;
export function rawshapecollidertoi_toi(a: number): number;
export function rawrotation_x(a: number): number;
export function rawrotation_z(a: number): number;
export function rawrotation_w(a: number): number;
export function rawvector_x(a: number): number;
export function rawvector_y(a: number): number;
export function rawvector_z(a: number): number;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_exn_store(a: number): void;
