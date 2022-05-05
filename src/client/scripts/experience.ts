import * as THREE from 'three'
import { decideAA } from './experience_helperfuncs';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'


/*
Experience First person environment
Created By: Peter Cross
Email : peter.cross222@gmail.com
*/

//vars to play with : 




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
    antialias: decideAA(),
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0xa7cca7,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new PointerLockControls(camera, document.body);
//use the pointer lock controls to make a good fps camera controller


camera.position.z = 5;

function animate(): void {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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

