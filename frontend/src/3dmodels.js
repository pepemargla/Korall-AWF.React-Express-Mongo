import React , { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
import { saveAs } from 'file-saver';
import "bootstrap/dist/css/bootstrap.min.css"; 
import * as dat from 'dat.gui'
const Modelado = () => {
   
    const mountRef = useRef(null)
    useEffect(() => {
  /*CONSTRUCCION SCENA*/
     //const cube = new THREE.Mesh(geometry, material); 
     const currentMount = mountRef.current
     const material =new THREE.MeshPhongMaterial({color: 0x00D6D6});
     const scene = new THREE.Scene();
     scene.background = new THREE.Color(0x2a3b4c);
     const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth /currentMount.clientHeight, 0.1, 10000);
     scene.add(camera);
     camera.position.z = 10;
     
     const renderer = new THREE.WebGLRenderer()
     renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
     currentMount.appendChild(renderer.domElement)
     
     const controls = new OrbitControls(camera, renderer.domElement);
   /*FIN CONSTRUCCION SCENA */
 
 
   /*  new STLLoader().load("/3dModels/Eiffel_tower_sample.stl", (stl) => {    
     const mesh = new THREE.Mesh(stl, material);
     mesh.position.set(0,0,0);
     mesh.scale.set(0.135, 0.135, 0.135);
     scene.add(mesh);
     });*/
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
     const geometry = new THREE.BoxGeometry(5,5,5);
     const mesh = new THREE.Mesh();
     const cube = new THREE.Mesh(geometry, material); 
     scene.add(cube);
     camera.lookAt(cube.position);
     const gui = new dat.GUI();
     const world = {
         box: {
             width: 5,
             height: 5,
             depth: 5
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
     /*GUI.DAT */
     const options = {
         color: 0x00D6D6,
         limpiar: () =>{
             scene.clear();
 
         },
         modelo1: () => {
             cube.clear();
         },
         modelo2: () => {
             cube.clear();
         },
         export: () =>{
             const buffer = STLExporter.fromMesh(mesh);
             const blob = new Blob([buffer], { type: STLExporter.mimeType });
             saveAs(blob, 'model3d.stl');
 
         }
       };
 
    
     gui.add(options,"modelo1").onChange((delet) =>{
      
       /* new STLLoader().load("/3dModels/Eiffel_tower_sample.stl", (stl) => {
         
           const mesh = new THREE.Mesh(stl, material);
             scene.add(mesh);
             mesh.scale.set(0.1, 0.1, 0.1);
             mesh.position.set(0, -5, 0);
             mesh.rotation.x = -Math.PI/2;
             
         */
             scene.remove(cube);
             new STLLoader().load("/3dModels/Eiffel_tower_sample.stl", (stl) => {
                   
                   const mesh = new THREE.Mesh(stl, material);
                   scene.add(mesh);
                   mesh.scale.set(0.1, 0.1, 0.1);
                   mesh.position.set(0, -5, 0);
                   mesh.rotation.x = -Math.PI/2;
                   
                }   
             )
       });
     gui.add(options,"modelo2").onChange((delet) =>{
         scene.remove(cube);
     new STLLoader().load("/3dModels/Stanford_Bunny_sample.stl", (stl) => {
            
           const mesh = new THREE.Mesh(stl, material);
           scene.add(mesh);
           mesh.scale.set(0.085, 0.085, 0.085);
           mesh.position.set(-3, -5, 0);
           mesh.rotation.x = -Math.PI/2;
           
        }   
     )});
     gui.add(options,'export').onChange((exp) =>{
         var exporter = new STLExporter();
         const buffer = exporter.parse(scene);
         const blob = new Blob([buffer], { type: STLExporter.mimeType });
         saveAs(blob, 'model3d.stl');
     })
     gui.addColor(options, "color").onChange((val) => {
         material.color.set(val);
       });
     const animate = () => {
      
         renderer.render(scene,camera);
         requestAnimationFrame(animate);
     };
 
 
     /*ANIMACION Y RENDERIZADO*/
     animate();
     renderer.render(scene, camera);
     return () => {
         currentMount.removeChild(renderer.domElement);
     
     }
     /*FIN ANyREN/
        /*  const loader = new STLLoader()
     
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
  
 })
     return(
         <div>
            
          <div ref={mountRef} style = {{width: '100%', height: '100vh'}}> 
          </div>
 
          </div>
     );
 };
export default Modelado