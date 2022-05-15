import * as THREE from 'three'
import { decideAA } from './experience_helperfuncs'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { Euler, Material, Object3D, Vector3 } from 'three'
import { rad } from './math_funcs'
import { getCenterPoint, getRadius, setPos } from './modelviewer_helperfuncs'


//#region LOADER DEFINES
const loadingManager = new THREE.LoadingManager(() => {

    
    const loadingScreen = document.getElementById('loading-screen');

}, function (url, itemsLoaded, itemsTotal) {

    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    let lp = (itemsLoaded / itemsTotal) * 100;
    //document.getElementById("loading-bar").style.cssText = "width: " + lp + "%;";
    //document.getElementById("percent-loaded").innerText = lp.toFixed(2) + "%";

}, function () {
    console.log('Loading complete!');
    BuildScene();
});
const OBJloader = new OBJLoader(loadingManager);
const MTLloader = new MTLLoader(loadingManager);
const FBXloader = new FBXLoader(loadingManager);
const GLTFloader = new GLTFLoader(loadingManager);
const DRACOloader = new DRACOLoader(loadingManager);

//setup gltf loader
DRACOloader.setDecoderPath('../../../node_modules/three/examples/js/libs/draco') // fix
GLTFloader.dracoLoader = DRACOloader;

function LoadObject(o: string, type: string) {
    o = './Media/3dmodels/' + o + '.' + type;
    switch (type) {
        case "fbx" || "FBX":
            FBXloader.load(o, function (object) {
                object.name = o.slice(o.lastIndexOf("/") + 1, o.lastIndexOf("."));
                object.scale.multiplyScalar(0.01)
                scene.add(object);
            });
            break;
        case "gltf" || "GLTF" || "glb" || "GLB":
            GLTFloader.load(o, function (object) {
                object.scene.traverse(function (gltf) {

                    if (gltf.isObject3D) {
                        gltf.castShadow = true;
                        gltf.receiveShadow = true;
                    }
                });
                //object.scene.name = o.slice(o.lastIndexOf("/") + 1, o.lastIndexOf("."));
                let object_ = new Object3D()
                object_ = object.scene
                scene.add(object_);
            });
            break;
        case "obj" || "OBJ":
            MTLloader.load(o.substring(0, o.length - 3) + 'mtl', function (material) {
                OBJloader.setMaterials(material);
                OBJloader.load(o, function (obj) {
                    scene.add(obj)
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
var FinalFullBuildv56: THREE.Object3D

//get the data from the script tag we live in : 
const args = document.currentScript?.outerHTML.slice(document.currentScript?.outerHTML.lastIndexOf('=') + 2, document.currentScript?.outerHTML.lastIndexOf('"')).split(',');

//Model to Load : 
console.log(args);
LoadObject(args![0], args![1])


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
    antialias: decideAA(),
    powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//use the pointer lock controls to make a good fps camera controller
const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 0.8;
scene.add(ambientLight)

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
    console.log(scene)
    //gets the object that got loaded, and passes it into the model var
    //first thing we need to do is load the "OBJECT", but to know what object to load, we need the name (dir) of the object
    model = scene.getObjectByName(args![0]);
    //rotate the object as the page desires
    model?.setRotationFromEuler(new Euler(rad(parseInt(args![2])), rad(parseInt(args![3])), rad(parseInt(args![4]))))
    //center the object in the scene
    if (args![1] != 'gtlf' || 'glb' || 'GLTF' || 'GLB') {
        const center = getCenterPoint(model!);
        console.log(center)
        model?.position.set(model.position.x - center.x, model.position.y - center.y, model.position.z - center.z);
        camera.position.x = getRadius(model!) + 3;
    }

}


