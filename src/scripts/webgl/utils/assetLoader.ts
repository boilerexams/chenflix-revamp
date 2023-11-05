import * as THREE from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { resolvePath } from '../../utils'

export type Assets = {
  [key in string]: {
    data?: THREE.Texture | THREE.VideoTexture | GLTF
    path: string
    encoding?: boolean
    flipY?: boolean
  }
}

export async function loadAssets(assets: Assets) {
  const gltfLoader = new GLTFLoader()


  await Promise.all(
    Object.values(assets).map(async (v) => {
      const path = v.path
      const response = await fetch(path)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const gltf = await gltfLoader.loadAsync(path)
      v.data = gltf

    }),
  )
}
