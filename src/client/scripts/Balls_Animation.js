const PIXI = require('pixi.js');
const {
    rad,
    map,
    lerp,
    deg
} = require("./math_funcs");
const MainColor = 0xFFD700;
const BallColor = 0xF2F2F2;
const num_balls = 200;

// Ball anaimation (PIXIJS)
// Made by Peter Cross
// peter.cross222@gmail.com



let app = new PIXI.Application({
    width:1024,
    height:1024,
    antialias: true,
    backgroundColor: 0x101010,
});
app.boundsPadding = 0;
// init ball vars
let r = 5; // the radius of the ball
let width = app.renderer.width,
    height = app.renderer.height - (r * 2); // the width and height of the app with safe space for the balls
let min_x = r,
    max_x = width - (r * 2);
let min_y = r,
    max_y = height - r;
/**
 * @param {Number} angle - angle / Direction
 * @param {Number} magnitude - Strength to move in that direction 
 */
class Vector {
    constructor(angle, magnitude) {
        this.angle = angle;
        this.magnitude = magnitude;
        this.xMagnitude = magnitude * Math.cos(angle);
        this.yMagnitude = magnitude * Math.sin(angle * -1);
    }
}
/**
 * Ball Object
 * @param {Number} r - Radius of the ball
 * @param {Number} x - x Cord of the ball
 * @param {Number} y - y Cord of the ball
 * @param {Vector} vector - Vector object containing how the ball will move
 * @param {Number} color - 0x###### format Hex Color for the ball
 * @param {Number} seed - Used to handle randomness with the ball, should be unique
 */
class ballInfo {
    constructor(r, x, y, vector, color, seed) {
        this.r = r
        this.x = x;
        this.y = y;
        this.vector = vector;
        this.color = color;
        this.seed = seed;
    }
}
/**
 * Object containing information about the Cursor and it's properties
 * @param {Number} x - x Cordinate
 * @param {Number} y - y Cordinate
 * @param {Boolean} down - If the Cursor is down
 * @param {Boolean} up - If the Cursor is up
 */
class Mouse {
    constructor(x, y, down, up) {
        this.x = x;
        this.y = y;
        this.down = down;
        this.up = up;
    }
}
app.stage.hitArea = app.screen;
app.stage.interactive = true;
let mousePos = new Mouse(width / 2, height / 2, false, true);
app.stage.on('mousemove', function (e) {
    mousePos.x = e.data.global.x;
    mousePos.y = e.data.global.y;
});
var balls = new Array(num_balls)
window.onresize = function () {
    resize_handler();
}
resize_handler();
window.onload = () =>{
    resize_handler();
}

function resize_handler() {
    app.renderer.resize(document.getElementsByClassName("hero")[0].getBoundingClientRect().width, document.getElementsByClassName("hero")[0].getBoundingClientRect().height);
    width = app.renderer.width;
    height = app.renderer.height;
    max_y = height - r;
    max_x = width - r;
    GenerateBallData();
}
GenerateBallData();

function GenerateBallData() {
    for (let i = 0; i < balls.length; i++) {
        var _r = 2 + Math.random() * 1.5;
        let tmp_vect = new Vector(rad(Math.random() * 360), (Math.random() * 8) / 50); // all math is in radians
        balls[i] = new ballInfo(
            _r,
            Math.floor(Math.random() * max_x),
            Math.floor(Math.max(Math.random() * max_y, min_y)),
            tmp_vect,
            BallColor,
            Math.random() * num_balls);
    }
}
document.body.appendChild(app.view);
let graphics = new PIXI.Graphics();
let line = new PIXI.Graphics();
let glowgrafx = new PIXI.Graphics();
var k = 0;
app.ticker.add((delta) => {
    glowgrafx.clear();
    graphics.clear();
    line.clear();
    BallPhysics(delta);
    CursorHandler(delta);
    app.stage.addChild(graphics, line);
});

/**
 * Point Object 
 * 
 * @param {Number} x - x Cord of the point
 * @param {Number} y - y Cord of the point
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Set(a) {
        this.x = a;
        this.y = a;
    }
}
let cursorRadius = 70;
let linecolor = BallColor;

function CursorHandler(delta) {
    //draw the cursor art
    graphics.lineStyle(1.5, MainColor);
    graphics.drawCircle(mousePos.x, mousePos.y, 20);
    graphics.endFill()
    //detect if the ball is within the radius of the cursor

    balls.forEach(ball => {
        if (distancetocursor(ball.x, ball.y) < cursorRadius) {
            ball.color = MainColor;
            Glow(ball.x, ball.y, MainColor, 4, 3, true);
            line.position = new PIXI.Point(0, 0);
            line.lineStyle(5 / map(distancetocursor(ball.x, ball.y), 0, 70, 0.2, 3), linecolor)
            line.moveTo(ball.x, ball.y);
            line.lineTo(mousePos.x, mousePos.y);
            if (mousePos.down) {
                Glow(mousePos.x, mousePos.y, MainColor, 2, 5, true);
                linecolor = MainColor;
                ball.x = lerp(ball.x, mousePos.x, delta / 100);
                ball.y = lerp(ball.y, mousePos.y, delta / 100);
            } else {
                Glow(mousePos.x, mousePos.y, 0x4a4a4a, 2, 5, true);
                linecolor = BallColor;
            }
        } else {
            ball.color = BallColor;
        }
    });

}

function distancetocursor(x, y) {
    return Math.sqrt(Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2));
}
app.stage.on("mousedown", function (e) {
    mousePos.down = true;
    mousePos.up = false;
    ClickHandler()
}); //mouse is currently down, and on the canvas
app.stage.on("mouseup", function (e) {
    mousePos.down = false;
    mousePos.up = true;
}); // mouse has let go
let num_clicks = 0;
let px, py;
let cx, cy;

function ClickHandler() { // 
    num_clicks++;
    py = cy;
    px = cx;
    cx = Math.floor(mousePos.x);
    cy = Math.floor(mousePos.y);
    if (num_clicks == 2 && cx == px && cy == py) {
        num_clicks = 0;
        //DoubleClickHandler();
    } else if (num_clicks > 2) {
        num_clicks = 0;
    }
}

function DoubleClickHandler() { // fires whenever the user double clicks on the page
    // new idea, when the user double clicks, all of the balls float a little toward the cursor
}


function BallPhysics(delta) {
    for (let i = 0; i < num_balls; i++) { // init multiple balls
        //handle collisions with the walls and such
        if (deg(balls[i].vector.angle) < 0) {
            balls[i].vector = new Vector(rad(deg(balls[i].vector.angle) + 360), balls[i].vector.magnitude)
        }

        if (balls[i].x > max_x + (2 * r)) { // right wall
            if (deg(balls[i].vector.angle) > 0 && deg(balls[i].vector.angle) < 90) {
                balls[i].vector = new Vector(rad(180 - Math.abs(deg(balls[i].vector.angle) + 360)), balls[i].vector.magnitude);
            } else if (deg(balls[i].vector.angle) > 270 && deg(balls[i].vector.angle) < 360) {
                balls[i].vector = new Vector(rad(180 + Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            }
        } else if (balls[i].x < (r * -2)) { // left wall
            //balls[i].color = 0xA6763C;
            if (deg(balls[i].vector.angle) > 90 && deg(balls[i].vector.angle) < 180) {
                balls[i].vector = new Vector(rad(180 - Math.abs(deg(balls[i].vector.angle) + 360)), balls[i].vector.magnitude);
            } else if (deg(balls[i].vector.angle) > 180 && deg(balls[i].vector.angle) < 270) {
                balls[i].vector = new Vector(rad(180 + Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            }
        } else if (balls[i].y > max_y + (4 * r)) { // floor
            //balls[i].color = 0x0D0D0D;
            if (deg(balls[i].vector.angle) > 270 && deg(balls[i].vector.angle) < 360) {
                balls[i].vector = new Vector(rad(Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            } else if ((deg(balls[i].vector.angle) > 180 && deg(balls[i].vector.angle) < 270)) {
                balls[i].vector = new Vector(rad(Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            }
        } else if (balls[i].y < min_y) { // ceiling
            //balls[i].color = 0x0D0D0D;
            if (deg(balls[i].vector.angle) > 0 && deg(balls[i].vector.angle) < 90) {
                balls[i].vector = new Vector(rad(Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            } else if (deg(balls[i].vector.angle) > 90 && deg(balls[i].vector.angle) < 180) {
                balls[i].vector = new Vector(rad(Math.abs(deg(balls[i].vector.angle) - 360)), balls[i].vector.magnitude);
            }
        }
        // apply vector magnitudes to the balls
        balls[i].x += balls[i].vector.xMagnitude; //change the x depending on the vector
        balls[i].y += balls[i].vector.yMagnitude; //change the y depending on the vector
        k += delta / 300000;
        graphics.lineStyle(0);
        graphics.beginFill(balls[i].color, (1 / 3) * Math.cos(k + balls[i].seed) + (2 / 3));
        graphics.drawCircle(balls[i].x, balls[i].y, balls[i].r);
        graphics.endFill();
    }
}

function Glow(x, y, color, resolution, radius, enable) {
    if (enable) {
        let step = radius / resolution;
        for (let i = 0; i < resolution; i++) {
            glowgrafx.lineStyle(0);
            glowgrafx.beginFill(color, (1 / resolution));
            glowgrafx.drawCircle(x, y, step);
            step = step + step;
        }
        app.stage.addChild(glowgrafx);
    }
}