import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let scene;
let camera;
let renderer;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cubeSet = createCube();
    const light = createLights();

    scene.add(cubeSet, light);

    // move cubeSet.
    cubeSet.position.set(0, 0, 0);


    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

export { World };
