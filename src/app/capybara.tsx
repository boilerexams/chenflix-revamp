'use client'
// Import the THREE.js library
import * as THREE from "three";
// To allow for the camera to move around the scene
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import React, { useEffect } from 'react';

function Capybara() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        const gltfLoader = new GLTFLoader()
        const url = '@src/models/scene.gltf'

        gltfLoader.load(url, (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }, []);

    return <div id="capybara-scene" />;
}

export default Capybara;
