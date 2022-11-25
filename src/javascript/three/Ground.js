import * as THREE from "three"
import { environment, loaders, scene } from "./Experience"

import waterVertexShader from "../../shaders/water/vertex.glsl?raw"
import waterFragmentShader from "../../shaders/water/fragment.glsl?raw"

export class Ground {
  constructor() {
    this.setGround()
    this.setWater()
  }

  setGround() {
    //Load textures
    this.groundDiffuseTexture = loaders.textureLoader.load(
      "/textures/floor.png"
    )
    this.groundDiffuseTexture.flipY = false
    this.groundDiffuseTexture.encoding = THREE.sRGBEncoding

    this.groundDiffuseTexture.repeat.x = 4
    this.groundDiffuseTexture.repeat.y = 4
    this.groundDiffuseTexture.wrapS = THREE.RepeatWrapping
    this.groundDiffuseTexture.wrapT = THREE.RepeatWrapping

    this.groundNormalTexture = loaders.textureLoader.load(
      "/textures/floor_normal.png"
    )
    this.groundNormalTexture.flipY = false

    //Set Ground
    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 1, 1),
      new THREE.MeshStandardMaterial({
        map: this.groundDiffuseTexture,
        normalMap: this.groundNormalTexture,
        envMap: environment.envMap,
        envMapIntensity: 1.5,
      })
    )
    this.ground.rotation.x = -Math.PI / 2
    scene.add(this.ground)
  }

  setWater() {
    this.water = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 1, 1),
      new THREE.ShaderMaterial({
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
        transparent: true,

        uniforms: {
          uTime: {
            value: 0,
          },
        },
      })
    )
    this.water.rotation.x = -Math.PI / 2
    this.water.position.y = 0.01
    scene.add(this.water)
  }

  update(elapsedTime) {
    this.water.material.uniforms.uTime.value = elapsedTime
  }
}
