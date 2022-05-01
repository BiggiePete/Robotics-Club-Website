import * as THREE from 'three'
import { decideAA } from './experience_helperfuncs';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'


/*
Experience First person environment
Created By: Peter Cross
Email : peter.cross222@gmail.com
*/


//#region Loaders



//#endregion Loaders



// create Vars for Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({
    antialias: decideAA(),
    powerPreference: "high-performance", // force higher performant devices
})

init();
function init() {

    renderer.outputEncoding = THREE.sRGBEncoding;

    //shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    //tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.background = null;
    document.body.appendChild(renderer.domElement);
    const controls = new FirstPersonControls(camera,renderer.domElement);

}

