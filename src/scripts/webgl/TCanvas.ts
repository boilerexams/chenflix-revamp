import * as THREE from 'three'
import { gl } from './core/WebGL'
import type { Assets } from './utils/assetLoader';
import { loadAssets } from './utils/assetLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { controls } from './utils/OrbitControls'
import vertexShader from './shader/vs.glsl'
import fragmentShader from './shader/fs.glsl'
import { calcCoveredTextureScale } from './utils/coveredTexture'
export class TCanvas {
  private assets: Assets = {
    model: { path: 'capybara_low_poly/scene.gltf' },
    
  }

  constructor(private container: HTMLElement) {
    loadAssets(this.assets).then(() => {
      this.init()
      this.createObjects()
      gl.requestAnimationFrame(this.anime)
    })
  }

  private init() {
    gl.setup(this.container)
    gl.scene.background = new THREE.Color('black')
    gl.camera.position.set(1.6, 0.3, 0);
  }

  private createObjects() {
    const gltf = this.assets.model.data as GLTF
    const model = gltf.scene
      
    model.position.set(0, -0.3, 0)
    model.rotation.set(0, 2, 0)
    model.scale.set(1, 1, 1)

    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32); 
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 'black',
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    
    groundMesh.receiveShadow = true;
    model.add(groundMesh);
   
    const spotLight = new THREE.SpotLight(0xffffff,  5, 100, 0.22, 1);
    spotLight.position.set(0, 3.5, 0);
    spotLight.castShadow = true;
    // spotLight.shadow.bias = -0.0001;
    model.add(spotLight);

    model.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
      }
    });

    groundMesh.castShadow = false;
    gl.scene.add(model)
  }

  // ----------------------------------
  // animation
  private anime = () => {
    controls.update()
    gl.render()
  }

  // ----------------------------------
  // dispose
  dispose() {
    gl.dispose()
  }
}
