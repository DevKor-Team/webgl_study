import {
    BoxBufferGeometry,
    Color,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    TextureLoader,
    sRGBEncoding,
    RepeatWrapping
} from 'three'
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'https://unpkg.com/three@0.146/examples/jsm/controls/FlyControls.js';

const container = document.querySelector('#scene-container');
const scene = new Scene();


scene.background = new Color('black');


const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;

const camera = new PerspectiveCamera(fov, aspect, near, far);
//camera.position.set(0, 0, 10);
camera.position.set(0, 5, 10);
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshStandardMaterial({ color: 'red' });

// add many many cubes
const cubeCount = 100;
const cubeSize = 0.5;

for (let i = 0; i < cubeCount; i++) {

    const random_color = 0xffffff;
    const _material = new MeshStandardMaterial({ color: random_color });

    const cube = new Mesh(
        new BoxBufferGeometry(cubeSize, cubeSize, cubeSize),
        _material,
    );

    cube.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
    );

    cube.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
    );

    cube.scale.set(
        Math.random() * 5.5,
        Math.random() * .5,
        Math.random() * .5,
    );

    scene.add(cube);
};

const light = new THREE.PointLight(0xffffff, 4, 100);
light.position.set(3, 3, 3);
scene.add(light);

const renderer = new WebGLRenderer();

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
window.addEventListener('pointermove', onPointerMove);



const rayCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 10, 32, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);

scene.add(rayCylinder);

const rayCylinerCaster = new THREE.Raycaster();

const rayOrigin = new THREE.Vector3(0, 0, 0);
const rayDirection = new THREE.Vector3(1, 0, 0);

// make cylinder follow rayDirection's direction




const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // move objects

    for(let i = 0; i < scene.children.length; i++) {
        scene.children[i].position.y = Math.sin(elapsedTime + i) * 2;
    }
    


    // update rayDirection
    rayDirection.x = Math.cos(elapsedTime);
    rayDirection.y = Math.sin(elapsedTime);
    rayDirection.normalize();

    rayCylinerCaster.set(rayOrigin, rayDirection);



    const CylinerIntersects = rayCylinerCaster.intersectObjects(scene.children);


    rayCylinder.position.copy(rayOrigin);
    
    rayCylinder.lookAt(rayDirection);


    for(const intersects of CylinerIntersects) {
        intersects.object.material.color.set(0x0000ff);
    }

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
    }
   
    controls.update(delta);


    renderer.render(scene, camera);
};

animate();
