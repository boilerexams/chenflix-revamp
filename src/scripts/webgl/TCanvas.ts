import * as THREE from 'three'
import { gl } from './core/WebGL'
import { Assets, loadAssets } from './utils/assetLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // Import GLTFLoader
import { controls } from './utils/OrbitControls'
import vertexShader from './shader/vs.glsl'
import fragmentShader from './shader/fs.glsl'
import { calcCoveredTextureScale } from './utils/coveredTexture'
console.log('helloe')
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
    gl.camera.position.z = 1.5
  }

  private createObjects() {
    const gltf = this.assets.model.data as GLTF
    const model = gltf.scene


      
    // You can adjust the position, rotation, and scale of the model here
    model.position.set(0, -0.3, 0)
    model.rotation.set(0, 1, 0)
    model.scale.set(1, 1, 1)

    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32); // Reduced size from 20 to 10
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 'black',
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    
    groundMesh.receiveShadow = true;
    model.add(groundMesh);
   
    const spotLight = new THREE.SpotLight(0xffffff,  5, 100, 0.22, 1);
    spotLight.position.set(0, 10, 0);
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
