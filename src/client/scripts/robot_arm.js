const PIXI = require('pixi.js')


const app = new PIXI.Application({
    width: 768,
    height: 768,
    antialias: true,
    backgroundColor: 0x101010,
});
app.stage.hitArea = app.screen;
app.stage.interactive = true;

/* 
    THE IDEA
    create a lil robotic arm sim using the drawing utility, it will live at the bottom of the canvas, and catch balls that are thrown at it
*/




