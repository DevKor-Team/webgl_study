import { BoxBufferGeometry, SphereGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three'
function createCube() {
  const geometry = new BoxBufferGeometry(2, 2, 2);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material_transparent = new MeshStandardMaterial({ color: 'purple', transparent: true, opacity: 0.05 , depthWrite: false});
  const material_metal = new MeshStandardMaterial({ color: 'green', transparent: true, opacity: 0.5 , metalness: 0.2, roughness: 0.1, depthWrite: false});
  const material_metal_2 = new MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.5,metalness: 0.2, roughness: 0.1, depthWrite: false});

  
  const cube_world = new Mesh(geometry, material_transparent);

  cube_world.rotation.set(-0.6, -0.1, 0.8);

  // Rotation is not commutative.
  // Let's define our clean cyliner.

  
  const child_box_geo = new BoxBufferGeometry(0.5, 1.0, 1.5);
  const child_box = new Mesh(child_box_geo, material_metal);

  const par_cylinder_geo = new CylinderGeometry(0.3, 0.3, 1.9, 32);
  const par_cyliner = new Mesh(par_cylinder_geo, material_metal_2);
  
  // let's add it to the cube
  cube_world.add(par_cyliner);
  par_cyliner.add(child_box);


  // EULER
  
  
  // let's rotate the cyliner 90 degrees around the y axis
  // and then 90 degrees around the x axis
  //par_cyliner.rotation.set(Math.PI / 2, 0, 0);
  //child_box.rotation.set(0, Math.PI/3, 0);


  // is this same as
  //par_cyliner.rotation.set(0, Math.PI/3, 0);
  //child_box.rotation.set(Math.PI / 2, 0, 0);
  


  // Querternion

  // let's define two rotations, as quaternions

  const q1 = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
  const q2 = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

  // applying them does not give the same result
  //par_cyliner.quaternion.multiply(q1);
  //child_box.quaternion.multiply(q2);

  //par_cyliner.quaternion.multiply(q2);
  //child_box.quaternion.multiply(q1);


  

  return cube_world;
}

export { createCube };
