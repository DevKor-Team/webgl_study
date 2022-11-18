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

//import {World} from 'cannon'
import * as CANNON from "./cannon-es.js";

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


const clock = new THREE.Clock();


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
)
scene.add(sphere)




const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const sphereShape = new CANNON.Sphere(0.5);

const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape
});

world.addBody(sphereBody);


if(true){


    const planeObject = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );

    planeObject.rotation.x = -Math.PI * 0.5;

    scene.add(planeObject);

    const floorShape = new CANNON.Plane()
    const floorBody = new CANNON.Body()
    floorBody.mass = 0
    floorBody.addShape(floorShape)
    world.addBody(floorBody)

    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5);

    if(true){
        const concreteMaterial = new CANNON.Material('concrete')
        const plasticMaterial = new CANNON.Material('plastic')

        const concretePlasticContactMaterial = new CANNON.ContactMaterial(
            concreteMaterial,
            plasticMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        );

        world.addContactMaterial(concretePlasticContactMaterial);
        floorBody.material = concreteMaterial;
        sphereBody.material = plasticMaterial;

        sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));
    }

}












function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    world.step(1 / 60, delta, 3)
    
    sphere.position.x = sphereBody.position.x
    sphere.position.y = sphereBody.position.y
    sphere.position.z = sphereBody.position.z

    controls.update(delta);
    renderer.render(scene, camera);
};

animate();
