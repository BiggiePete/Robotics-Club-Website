import {
    Box3,
    Object3D,
    Sphere,
    Vector3
} from "three";


export function getVarsNames(v:object) {
    // getting keys or names !
    let names = Object.keys(v);
    // return array contain all names of variables 
    return names[0];
}
/**
 * Changes Position of object 'a' to that of object 'b',
 * With an Offset if supplied
 * @param {THREE.Object3D} a object to change
 * @param {THREE.Object3D} b reference object
 * @param {THREE.Vector3} offset offset from object b
 */
export function setPos(a: Object3D, b: Object3D, offset?: Vector3) {
    if (offset == null) {
        a.position.x = b.position.x;
        a.position.y = b.position.y;
        a.position.z = b.position.z;
    } else {
        let _ = new Vector3(
            offset.x + b.position.x,
            offset.y + b.position.y,
            offset.z + b.position.z);
        a.position.x = _.x;
        a.position.y = _.y;
        a.position.z = _.z;
    }
}
/**
 * Changes Rotation of object 'a' to that of object 'b',
 * With an Offset if supplied
 * @param {THREE.Object3D} a object to change
 * @param {THREE.Object3D} b reference object
 * @param {THREE.Vector3} offset offset from object b
 */
export function setRot(a: Object3D, b: Object3D, offset?: Vector3) {
    if (offset == null) {
        a.rotation.x = b.rotation.x;
        a.rotation.y = b.rotation.y;
        a.rotation.z = b.rotation.z;
    } else {
        let _ = new Vector3(
            offset.x + b.rotation.x,
            offset.y + b.rotation.y,
            offset.z + b.rotation.z);
        a.rotation.x = _.x;
        a.rotation.y = _.y;
        a.rotation.z = _.z;
    }
}
/**
 * changes the Scale of a to match that of b, or be offset from b with some offset
 * @param {THREE.Object3D} a object to change
 * @param {THREE.Object3D} b object to reference
 * @param {THREE.Vector3} offset scale multiplier xyz
 */
export function setScale(a: Object3D, b: Object3D, offset?: Vector3) {
    if (offset) {
        let _ = new Vector3(
            offset.x * b.scale.x,
            offset.y * b.scale.y,
            offset.z * b.scale.z);
        a.scale.set(_.x, _.y, _.z);
    } else {
        a.scale.set(b.scale.x, b.scale.y, b.scale.z);
    }
}
export function getCenterPoint(mesh: Object3D) {
    var geometry = new Box3().setFromObject(mesh)
    console.log(geometry);
    let sphere = new Sphere()
    geometry.getBoundingSphere(sphere);
    return sphere.center;
}
export function getRadius(mesh: Object3D) {
    var geometry = new Box3().setFromObject(mesh)
    console.log(geometry);
    let sphere = new Sphere()
    geometry.getBoundingSphere(sphere);
    console.log(sphere);
    return sphere.radius;
}