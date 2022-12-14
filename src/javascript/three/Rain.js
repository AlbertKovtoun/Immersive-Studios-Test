import * as THREE from "three"
import rainVertexShader from "../../shaders/rain/vertex.glsl?raw"
import rainFragmentShader from "../../shaders/rain/fragment.glsl?raw"
import { scene } from "./Experience"

export class Rain {
  constructor() {
    this.setRain()
  }

  setRain() {
    console.log("Rain Loaded!")

    const particleCount = 10000

    const geometry = new THREE.BufferGeometry()

    const positions = []
    const positionVectors = []
    const randoms = new Float32Array(particleCount)

    const n = 10,
      n2 = n / 2 // particles spread in the sphere + put sphere in center

    for (let i = 0; i < particleCount; i++) {
      // positions
      const x = Math.random() * n - n2
      const y = Math.random() * n - n2
      const z = Math.random() * n - n2

      positionVectors.push(new THREE.Vector3(x, y, z))

      if (positionVectors[i].distanceTo(new THREE.Vector3(0, 0, 0)) < n / 2) {
        positions.push(x, y, z)
        randoms[i] = Math.random()
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))

    geometry.computeBoundingSphere()

    this.insideSphereMaterial = new THREE.ShaderMaterial({
      vertexShader: rainVertexShader,
      fragmentShader: rainFragmentShader,
      transparent: true,

      uniforms: {
        uTime: { value: 0 },
      },
    })

    this.insidePoints = new THREE.Points(geometry, this.insideSphereMaterial)
    scene.add(this.insidePoints)
  }

  update(elapsedTime) {
    this.insideSphereMaterial.uniforms.uTime.value = elapsedTime
  }
}
