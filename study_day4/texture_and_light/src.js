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


const container = document.querySelector('#scene-container');


const scene = new Scene();


scene.background = new Color('skyblue');


const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;

const camera = new PerspectiveCamera(fov, aspect, near, far);



camera.position.set(0, 0, 10);


const geometry = new BoxBufferGeometry(2, 2, 2);

// load texture
const textureLoader = new TextureLoader().setPath(
    "dusty-cobble-ue/"
);

const diffuseMap = textureLoader.load("dusty-cobble_albedo.png");
//diffuseMap.encoding = sRGBEncoding;

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
    displacementScale: 0.1,
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


// ADD LIGHR!

/*

// pointlight
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 3, 3, 3 );
scene.add( light );


// HemisphereLight
scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );


// AmbientLight
scene.add( new THREE.AmbientLight( 0x222222 ) );
*/

const renderer = new WebGLRenderer();

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);


function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
