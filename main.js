import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
//device rendering
renderer.setPixelRatio(window.devicePixelRatio);
//shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//add to html
document.body.appendChild(renderer.domElement);


//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(4, 0, 5);

//orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1.52;
controls.maxDistance = 2;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 0.5, 0);
controls.update();

//ground
//ground
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32); // Reduced size from 20 to 10
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 'black',
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);


//light
const spotLight = new THREE.SpotLight(0xffffff,  5, 100, 0.22, 1);
spotLight.position.set(0, 15, 5);
spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
scene.add(spotLight);


//loading model
const loader = new GLTFLoader().setPath('public/capybara_low_poly/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;

  //recursively applys shadows
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, ( xhr ) => {
  document.getElementById('progress').innerHTML = `Loading ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
},);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();