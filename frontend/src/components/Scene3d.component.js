import React , { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import "bootstrap/dist/css/bootstrap.min.css";
const App3D = () => {
   const mountRef = useRef(null)

   useEffect(() => {
    const currentMount = mountRef.current

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    scene.add(camera);
    camera.position.z = 6;
    camera.position.x = 6;

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({color: 0x0f2c64});
    const cube = new THREE.Mesh(geometry, material); 
    scene.add(cube);
    camera.lookAt(cube.position);

    const animate = () => {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    };

    animate();

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
export default App3D