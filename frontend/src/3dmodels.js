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
     const camera = new 
     THREE.PerspectiveCamera(25, 
         currentMount.clientWidth /currentMount.clientHeight,
          1, 
          10000);
 
     scene.add(camera);
     
     camera.position.x = 65;
     camera.position.y = 90;
     camera.position.z = 0;
 
     camera.lookAt (new THREE.Vector3(0,0,0));
     
     const renderer = new THREE.WebGLRenderer()
     renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
     currentMount.appendChild(renderer.domElement)
     
     const controls = new OrbitControls(camera, renderer.domElement);
     /*FIN CONSTRUCCION SCENA */

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
     light4.position.set(-10, -5, 0)
     scene.add(light4)
     const light5 = new THREE.DirectionalLight(0xffffff);
     light5.position.set(20, -10, 10)
     scene.add(light5)
     const loader = new STLLoader();
 
     loader.load("/3dModels/Eiffel_tower_sample.stl", function (geometry) {
         const mat = new THREE.MeshPhongMaterial({
           color: 0x086233,
           transparent:true,
           opacity:1,
           shininess:200,
         })
 
         const model = new THREE.Mesh(geometry, mat);
         model.rotation.x = -0.5 * Math.PI;
         model.position.y = -10
         model.scale.set(0.3, 0.3, 0.3);
         model.name = 'armMesh';
         model.castShadow = false;    
         scene.add(model);
 
 
     const gui = new dat.GUI();
     const world = {
         model: {
             x: 0.3,
             y: 0.3,
             z: 0.3
         }
     }
    gui.add(world.model, 'x', 0.10 ,0.50).onChange(() =>{
         model.scale.set(world.model.x,world.model.y,world.model.z)
         
     })
 
     gui.add(world.model, 'y', 0.10 ,0.50).onChange(() =>{
         model.scale.set(world.model.x,world.model.y,world.model.z)
         
     })
 
     //cube.geometry = new THREE.Mesh(world.cube.z)
     gui.add(world.model, 'z', 0.10 ,0.50).onChange(() =>{
         model.scale.set(world.model.x,world.model.y,world.model.z)
         
     })
 
 
     /*GUI.DAT */
     const options = {
         color: 0x00D6D6,
         limpiar: () =>{
             scene.clear();
 
         },
         modelo1: () => {
             model.clear();
         },
         modelo2: () => {
             model.clear();
         },
         export: () =>{
             const buffer = new STLExporter().parse(scene);
             const blob = new Blob([buffer], { type: STLExporter.mimeType });
            
 
         }
       };
 
       gui.add(options,"modelo1").onChange((delet) =>{
        /*  new STLLoader().load("/3dModels/Eiffel_tower_sample.stl", (stl) => {
             const mesh = new THREE.Mesh(stl, material);
               scene.add(mesh);
               mesh.scale.set(0.1, 0.1, 0.1);
               mesh.position.set(0, -5, 0);
               mesh.rotation.x = -Math.PI/2; 
           */
              scene.clear()
               loader.load("/3dModels/Stanford_Bunny_sample.stl", function (geometry) {
                   const mat = new THREE.MeshPhongMaterial({
                     color: 0x086113,
                     transparent:true,
                     opacity:1,
                     shininess:200,
                   })
                  }   
               )
               const model = new THREE.Mesh(geometry, mat);
               model.rotation.x = -0.5 * Math.PI;
               model.position.y = -10
 
               model.scale.set(0.1, 0.1, 0.1);
               model.name = 'armMesh';
               model.castShadow = false;    
               scene.add(model);
               scene.add(light)
               scene.add(light2)
               scene.add(light3)
               scene.add(light4)
               scene.add(light5)
           
         });
         
       gui.add(options,"modelo2").onChange((delet) =>{
           scene.clear()
       new STLLoader().load("/3dModels/Stanford_Bunny_sample.stl", (stl) => {
              
             const mesh = new THREE.Mesh(stl, material);
             scene.add(mesh);
             mesh.scale.set(0.3, 0.3, 0.3);
             mesh.position.set(-3, -5, 0);
             mesh.rotation.x = -Math.PI/2;
             scene.add(light)
             scene.add(light2)
             scene.add(light3)
             scene.add(light4)
             scene.add(light5)
             
          }   
       )});
   
       /**EXPORTER */
      
      
       
       gui.add(options,'export').onChange((exp) =>{
           
           const buffer = new STLExporter().parse(scene);
           
           const blob = new Blob([buffer], { type: STLExporter.mimeType });
           saveAs(blob, 'model.stl');
        
          
       })
       gui.addColor(options, "color").onChange((val) => {
           mat.color.set(val);
         });
 
 
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
 })
     return(
         <div>
            
          <div ref={mountRef} style = {{width: '100%', height: '100vh'}}> 
          </div>
 
          </div>
     );
 };
export default Modelado