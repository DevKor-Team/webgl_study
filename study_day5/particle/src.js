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

    const random_color = Math.random() * 0xffffff;
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
        Math.random() * .5,
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



let particlesMaterial, count, particlesGeometry;

// basic particle
if (false) {
    particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
    particlesMaterial = new THREE.PointsMaterial()
    particlesMaterial.size = 0.02
    particlesMaterial.sizeAttenuation = true

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
}

if (true) {
    // Geometry
    particlesGeometry = new THREE.BufferGeometry()
    particlesMaterial = new THREE.PointsMaterial()
    particlesMaterial.size = 0.02
    particlesMaterial.sizeAttenuation = true
    count = 500

    const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

    for (let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
    {
        positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    if (true) {
        particlesMaterial.size = 1.5

        const textureLoader = new THREE.TextureLoader()
        const particleTexture = textureLoader.load('particles/stars/star_02.png')

        particlesMaterial.map = particleTexture
        particlesMaterial.transparent = true
        particlesMaterial.alphaMap = particleTexture

        /*
        WebGL is testing if what's being drawn is closer than what's already drawn.
The depth of what's being drawn is stored in what we call a depth buffer. Instead of not testing
 if the particle is closer than what's in this depth buffer, we can tell the WebGL not to write 
particles in that depth buffer
        */
        particlesMaterial.depthWrite = false


        particlesMaterial.blending = THREE.AdditiveBlending
    }
}









const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    controls.update(delta);


    if (true) {

        for (let i = 0; i < count; i++) {
            let i3 = i * 3

            const x = particlesGeometry.attributes.position.array[i3]
            particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        }
        particlesGeometry.attributes.position.needsUpdate = true
    }




    renderer.render(scene, camera);
};

animate();
