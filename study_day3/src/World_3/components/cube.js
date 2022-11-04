import { BoxBufferGeometry, SphereGeometry, CylinderGeometry, Mesh, MeshStandardMaterial } from 'three'
function createCube() {
  const geometry = new BoxBufferGeometry(2, 2, 2);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material_transparent = new MeshStandardMaterial({ color: 'purple', transparent: true, opacity: 0.05 , depthWrite: false});
  const material_metal = new MeshStandardMaterial({ color: 'green', transparent: true, opacity: 0.5 , metalness: 0.2, roughness: 0.1, depthWrite: false});
  const material_metal_2 = new MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.5,metalness: 0.2, roughness: 0.1, depthWrite: false});

  
  const cube_world = new Mesh(geometry, material_transparent);

  cube_world.rotation.set(-0.6, -0.1, 0.8);

  // let's add sphere and a cyliner
  
  const sphere_geo = new SphereGeometry(1, 32, 32);
  const sphere = new Mesh(sphere_geo, material_metal);

  const cylinder_geo = new CylinderGeometry(0.5, 0.5, 2, 32);
  const cylinder = new Mesh(cylinder_geo, material_metal_2);

  cube_world.add(sphere);
  cube_world.add(cylinder);
  

  // now let's change the position of the sphere and cylinder
  sphere.position.set(0, 3, 0);
  cylinder.position.set(0, -3, 0);

  // let's rotate the cylinder
  //cylinder.rotation.set(0, 0, 0.5);


  // let's add a cyliner to the cylinder

  
  const child_of_cyliner_geo = new CylinderGeometry(0.5, 0.5, 1, 32);
  const child_of_cyliner = new Mesh(child_of_cyliner_geo, material_metal);

  cylinder.add(child_of_cyliner);
  child_of_cyliner.position.set(0, -1, 0);
  


  // Scaling
  // What happens if we scale the cube?

  //cube_world.scale.set(2, 2, 2);

  // What happens if we scale the parent cyliner?
  // cylinder.scale.set(2, 2, 2);

  // Rotation
  // What happens to the cylinder if we rotate the cube?

  //cube_world.rotation.set(0, 0, 0.5);

  // What happens if we rotate the parent cyliner?

  //cylinder.rotation.set(0, 0, 0.5);

  // Rotation is not commutative.
  // Let's define our clean cyliner.

  /*
  const child_box_geo = new BoxBufferGeometry(0.5, 1.0, 1.5);
  const child_box = new Mesh(child_box_geo, material_metal);

  const par_cylinder_geo = new CylinderGeometry(0.3, 0.3, 1.9, 32);
  const par_cyliner = new Mesh(par_cylinder_geo, material_metal_2);
  */

  // let's add it to the cube
  
  /*
  cube_world.add(par_cyliner);
  par_cyliner.add(child_box);

  // let's rotate the cyliner 90 degrees around the y axis
  // and then 90 degrees around the x axis
  par_cyliner.rotation.set(Math.PI / 2, 0, 0);
  child_box.rotation.set(0, Math.PI/3, 0);
  */

  // is this same as
  //par_cyliner.rotation.set(0, Math.PI/3, 0);
  //child_box.rotation.set(Math.PI / 2, 0, 0);

  // Querternion
  

  return cube_world;
}

export { createCube };
