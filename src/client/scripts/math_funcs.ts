export { deg, rad, lerp, map }


/**
 *
 * @param {Number} rad
 * @returns Value converted to Degrees
 */
function deg(rad: number): number {
    return (rad * 180) / Math.PI;
}

/**
 *
 * @param {Number} deg
 * @returns Value converted to Radians
 */
function rad(deg: number): number {
    return (deg * Math.PI) / 180;
}
/**
 *
 * @param {Number} v0 - Starting Value
 * @param {Number} v1 - Value to Approach
 * @param {Number} t - Time Constant, changes interpolation
 * @returns Amount of Change to interpolate
 */
function lerp(v0: number, v1: number, t: number): number {
    return v0 * (1 - t) + v1 * t;
}
/**
 *
 * @param {Number} x Value
 * @param {Number} in_min Minimum x Value
 * @param {Number} in_max Maximum x Value
 * @param {Number} out_min Minimum desired output
 * @param {Number} out_max Maximum desired output
 * @returns Value between out_min and out_max interpolated for the range linearly
 */
function map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
