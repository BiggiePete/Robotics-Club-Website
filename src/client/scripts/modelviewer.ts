import * as THREE from 'three'
import { decideAA } from './experience_helperfuncs'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { Euler} from 'three'
import { rad } from './math_funcs'
import { getCenterPoint, getRadius} from './threejs_helpers'


//#region LOADER DEFINES
const loadingManager = new THREE.LoadingManager(() => {

    BuildScene();
    const loadingScreen = document.getElementById('loading-screen');

}, function (url, itemsLoaded, itemsTotal) {

    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    let lp = (itemsLoaded / itemsTotal) * 100;
    // build a loading bar for all canvases
    //maybe look into loading async, then render the loading bar


    //document.getElementById("loading-bar").style.cssText = "width: " + lp + "%;";
    //document.getElementById("percent-loaded").innerText = lp.toFixed(2) + "%";

}, function () {
    console.log('Loading complete!');
});
const OBJloader = new OBJLoader(loadingManager);
const MTLloader = new MTLLoader(loadingManager);
const FBXloader = new FBXLoader(loadingManager);

function LoadObject(o: string, type: string) {
    o = './Media/3dmodels/' + o + '.' + type;
    switch (type) {
        case "fbx" || "FBX":
            FBXloader.load(o, function (object) {
                object.name = o.slice(o.lastIndexOf("/") + 1, o.lastIndexOf("."));
                //object.scale.multiplyScalar(0.01)
                scene.add(object);
            });
            break;
        case "obj" || "OBJ":
            MTLloader.load(o.substring(0, o.length - 3) + 'mtl', function (mat) {
                OBJloader.setMaterials(mat);
                OBJloader.load(o, function (obj) {
                    scene.add(obj);
                })
            })
            break;
        default:
            break;
    }
}


/*
3D model viewer using THREEjs
Created By: Peter Cross
Email : peter.cross222@gmail.com
*/

//vars to play with : 
const CameraFOV = 75;
const BackgroundColor = 0x202020;


const args = document.currentScript?.outerHTML.slice(document.currentScript?.outerHTML.lastIndexOf('=') + 2, document.currentScript?.outerHTML.lastIndexOf('"')).split(',');
export function ForceLoad(a: any, b: any, c: any, d: any, e: any) {
    args![0] = a;
    args![1] = b;
    args![2] = c;
    args![3] = d;
    args![4] = e;
    init();
}
//get the data from the script tag we live in : 


//globals
const scene = new THREE.Scene();
scene.background = new THREE.Color(BackgroundColor);
const canvas = undefined
const camera = new THREE.PerspectiveCamera(CameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
    antialias: decideAA(),
    powerPreference: "high-performance",
    canvas: canvas ? canvas : undefined // he he he haw
});
const controls = new OrbitControls(camera, renderer.domElement);
const ambientLight = new THREE.AmbientLight();

//Model to Load : 
function init() {
    console.log(args);
    LoadObject(args![0], args![1]);
    console.log(canvas);


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    controls.update();
    ambientLight.intensity = 0.8;
    scene.add(ambientLight);
}


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


let model;
/**
 * handles setting up the scene for the user
 */
function BuildScene(): void {
    console.log(scene);
    //gets the object that got loaded, and passes it into the model var
    //first thing we need to do is load the "OBJECT", but to know what object to load, we need the name (dir) of the object
    model = scene.getObjectByName(args![0]);
    //rotate the object as the page desires
    model?.setRotationFromEuler(new Euler(rad(parseInt(args![2])), rad(parseInt(args![3])), rad(parseInt(args![4]))));
    //center the object in the scene
    const center = getCenterPoint(model!);
    console.log(center);
    model?.position.set(model.position.x - center.x, model.position.y - center.y, model.position.z - center.z);

    let radius = getRadius(model!);
    radius = radius < 1 ? radius += 1 : radius;
    const ground = new THREE.PolarGridHelper(radius + 2, 6, 3);
    ground.position.y = -radius;
    scene.add(ground);
    camera.position.set(radius, radius, radius);

}


