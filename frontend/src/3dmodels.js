import React , { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import "bootstrap/dist/css/bootstrap.min.css"; 
const Modelado = () => {
   const mountRef = useRef(null)
   
   useEffect(() => {
    const currentMount = mountRef.current
    const material = new THREE.MeshBasicMaterial({color: 0x0f2c64});
 
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    scene.add(camera);
    camera.position.z = 10;
    
    scene.background = new THREE.Color(0x2a3b4c);
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)
    
    const controls = new OrbitControls(camera, renderer.domElement);
    const animate = () => {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    };
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(0, 0, 10)
    scene.add(light)
    animate();
    const loader = new STLLoader()
    
loader.load(
  "/3dModels/Eiffel_tower_sample.STL",
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
)
    //const geometry = new THREE.BoxGeometry(1,1,1)
    //
    //const cube = new THREE.Mesh(geometry, material); 
    //scene.add(cube);
    //camera.lookAt(cube.position);



    renderer.render(scene, camera);
    return () => {
        currentMount.removeChild(renderer.domElement);

    }
}, [])
    return(
        
         <div ref={mountRef} style = {{width: '100%', height: '100vh'}}> 
         </div>
        
    );
};
export default Modelado