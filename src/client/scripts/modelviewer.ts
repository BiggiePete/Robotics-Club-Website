
import * as HELP from './modelviewer_helperfuncs'

import * as THREE from 'three'
import { decideAA } from './experience_helperfuncs'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { LoadingManager } from 'three';



//#region LOADER DEFINES
const loadingManager = new THREE.LoadingManager(() => {

    BuildScene();
    const loadingScreen = document.getElementById('loading-screen');

}, function (url, itemsLoaded, itemsTotal) {

    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    let lp = (itemsLoaded / itemsTotal) * 100;
    //document.getElementById("loading-bar").style.cssText = "width: " + lp + "%;";
    //document.getElementById("percent-loaded").innerText = lp.toFixed(2) + "%";

}, function () {

    console.log('Loading complete!');

});
const FBXloader = new FBXLoader(loadingManager);

function LoadObject(o: string) {
    o = './Media/3dmodels/' + o + '.glb';
    FBXloader.load(o, function (object) {
        object.name = o.slice(o.lastIndexOf("/") + 1, o.lastIndexOf("."));
        scene.add(object);
    });
}

//#endregion LOADER DEFINED

/*
3D model viewer using THREEjs
Created By: Peter Cross
Email : peter.cross222@gmail.com
*/

//vars to play with : 


//Model to Load : 
//LoadObject()

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
    antialias: decideAA(),
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//use the pointer lock controls to make a good fps camera controller


camera.position.z = 5;

function animate(): void {
    requestAnimationFrame(animate);
    controls.update();
    const delta = clock.getDelta();

    renderer.render(scene, camera);
};

animate();



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    animate()
}


let model
function BuildScene() {
    //gets the object that got loaded, and passes it into the model var
    //first thing we need to do is load the "OBJECT", but to know what object to load, we need the name (dir) of the object
}


