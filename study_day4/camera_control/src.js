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


scene.background = new Color('skyblue');


const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;

const camera = new PerspectiveCamera(fov, aspect, near, far);


//camera.position.set(0, 0, 10);
camera.position.set(0, 5, 10);


const geometry = new BoxBufferGeometry(2, 2, 2);

// load texture
const textureLoader = new TextureLoader().setPath(
    "dusty-cobble-ue/"
);

const diffuseMap = textureLoader.load("dusty-cobble_albedo.png");
const aoMap = textureLoader.load("dusty-cobble_ao.png");
const heightMap = textureLoader.load("dusty-cobble_height.png");
const metallicMap = textureLoader.load("dusty-cobble_metallic.png");
const normalMap = textureLoader.load("dusty-cobble_normal-dx.png");
const roughnessMap = textureLoader.load("dusty-cobble_roughness.png");

const material = new MeshStandardMaterial({
    map: diffuseMap,
    aoMap: aoMap,
    aoMapIntensity: 1,
    displacementMap: heightMap,
    displacementScale: 0.,
    metalnessMap: metallicMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap
});

material.roughness = 0.1; // attenuates roughnessMap
material.metalness = 1; // attenuates metalnessMap

material.map.wrapS = RepeatWrapping;
material.roughnessMap.wrapS = RepeatWrapping;
material.metalnessMap.wrapS = RepeatWrapping;
material.normalMap.wrapS = RepeatWrapping;

const cube = new Mesh(geometry, material);

scene.add(cube);


// add many many cubes

const cubeCount = 100;
const cubeSize = 0.5;

for (let i = 0; i < cubeCount; i++) {
    const cube = new Mesh(
        new BoxBufferGeometry(cubeSize, cubeSize, cubeSize),
        material,
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
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2,
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


// orbit controls
/*
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;
*/
// fly controls

/*
const controls = new FlyControls( camera, renderer.domElement );

controls.movementSpeed = 2.0;
controls.domElement = renderer.domElement;
controls.rollSpeed = Math.PI / 24;
controls.autoForward = false;
controls.dragToLook = true;
*/

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    //controls.update(delta);
    camera.position.z = 3.0;

    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
