import React , { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import "bootstrap/dist/css/bootstrap.min.css"; 
import * as dat from 'dat.gui'
const Modelado = () => {
   const mountRef = useRef(null)



   useEffect(() => {
      
    const currentMount = mountRef.current
    const material =new THREE.MeshPhongMaterial({color: 0xCCB50E});
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c);
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth /currentMount.clientHeight, 0.1, 10000);
    scene.add(camera);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)
    
    const controls = new OrbitControls(camera, renderer.domElement);
  
    /*Light's */
    
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-5, 5, 30)
    scene.add(light)
    
    const light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-5, 5, -50)
    scene.add(light2)
    const light3 = new THREE.DirectionalLight(0xffffff);
    light3.position.set(-5, 10, 0)
    scene.add(light3)
    const light4 = new THREE.DirectionalLight(0xffffff);
    light4.position.set(-15, -5, 0)
    scene.add(light4)
    const light5 = new THREE.DirectionalLight(0xffffff);
    light5.position.set(5, -10, 0)
    scene.add(light5)
  

    const geometry = new THREE.BoxGeometry(1,1,1)
    
    const cube = new THREE.Mesh(geometry, material); 
    scene.add(cube);
    camera.lookAt(cube.position);
    
    const gui = new dat.GUI();
    const world = {
        box: {
            width: 1,
            height: 1,
            depth: 1
        }
    }
    gui.add(world.box, 'width', 1 ,20).onChange(() =>{
        cube.geometry.dispose()
        cube.geometry = new THREE.BoxGeometry(world.box.width,world.box.height,world.box.depth)
    })

    gui.add(world.box, 'height', 1, 20).onChange(() =>{
        cube.geometry.dispose()
        cube.geometry = new THREE.BoxGeometry(
            world.box.width,
            world.box.height,
            world.box.depth
        )

    })

    gui.add(world.box, 'depth', 1, 20).onChange(() =>{
        cube.geometry.dispose()
        cube.geometry = new THREE.BoxGeometry(
            world.box.width,
            world.box.height,
            world.box.depth
        )
    })
    const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    };
    animate();
    renderer.render(scene, camera);
    return () => {
        currentMount.removeChild(renderer.domElement);
    
    }
/*INICIO DE IMPORTACION DE STL*/
/*const loader = new STLLoader()

loader.load(
"/3dModels/Eiffel_tower_sample.stl",
function (geometry) {
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.position.set(0, -5, 0);
    mesh.rotation.x = -Math.PI/2;
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
    console.log(error)
}
)*/

}, [])
    return(
        <div>
        
     <div ref={mountRef} style = {{width: '100%', height: '100vh'}}> 
     </div>

     </div>
        
    );
};
export default Modelado