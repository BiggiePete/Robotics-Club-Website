const {
    ClassificationType
} = require("typescript");

/**
 * Vector 2 Class
 */
class Vector2 {
    /**
     * 
     * @param {Number} x x component
     * @param {Number} y y component
     */
    constructor(x = 0, y = 0) {
        this.angle = Math.atan(y / x);
        this.x = x;
        this.y = y;
        this.magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    /**
     * 
     * @param {Number} n number to multiply the vector with
     */
    multiplyScalar(n) {
        this.x = this.x * n;
        this.y = this.y * n;
    }
    /**
     * 
     * @param {Vector2} v vector to multiply with
     */
    multiplyVector(v) {
        this.x = this.x * v.x;
        this.y = this.y * v.y;
    }
    /**
     * 
     * @param {Number} a angle
     * @param {Number} m magnitude
     */
    setFromPolar(a, m) {
        this.angle = a;
        this.magnitude = m;
        this.x = m * Math.cos(a);
        this.y = m * Math.sin(a * -1);
    }
    /**
     * Takes an array of vectors and computes a resultant vector
     * @param  {...Vector2} v Array of Vectors
     * @returns Vector2 result from vectors
     */
    resultVector(...v) {
        let f = new Vector2(v[0].x, v[0].y);
        for (let i = 0; i < v.length; i++) {
            f.x += (v[i].magnitude * Math.cos(v[i].angle));
            f.y += (v[i].magnitude * Math.sin(v[i].angle));
        }
        return f;
    }
}
class Box2D {
    /**
     * 
     * @param {Number} x x position
     * @param {Number} y y position
     * @param {Number} x2 width
     * @param {Number} y2 height
     */
    constructor(x, y, x2, y2) {
        this.x = x;
        this.x2 = x2;
        this.y = y;
        this.y2 = y2;
    }
    resize(x, y, x1, y1) {
        this.x = x;
        this.y = y;
        this.x2 = x1;
        this.y2 = y1;
    }
}

class Circle2D {
    /**
     * 
     * @param {Number} x x position
     * @param {Number} y y position
     * @param {Number} r radius
     */
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    resize(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

class collision {
    /**
     * 
     * @param {Boolean} c is there a collision
     * @param {Vector2} v vector needed to rectify the collision
     * @param {Number} x x position of the collision
     * @param {Number} y y position of the collision
     */
    constructor(c, v = 0, x = 0, y = 0) {
        this.collision = c;
        this.rectifyVect = v;
        this.x = x;
        this.y = y;
    }
}

class PhysicsObject {
    /**
     * 
     * @param {Box2D | Circle2D} bounds bounds of the object
     * @param {Number} mass mass of the object (how much gravity will effect it)
     * @param {Vector2} vector vector of the object
     */
    constructor(bounds = 0, mass = 0, vector = 0) {
        this.bounds = bounds;
        this.mass = mass;
        this.vector = vector
    }
    /**
     * detects a collision, and returns a collision object
     * @param {PhysicsObject} object object to check collision against
     */
    detectCollision(object) {
        switch (typeof (this.bounds)) {
            case typeof (Box2D):
                switch (typeof (object.bounds)) {
                    case typeof (Box2D): // box on box

                        break;
                    case typeof (Circle2D): // box on circle

                        break;
                }
                break;
            case typeof (Circle2D):
                switch (typeof (object.bounds)) {
                    case typeof (Box2D): // circle on box

                        break;
                    case typeof (Circle2D): // circle on circle

                        break;
                }
                break;
        }
    }
}