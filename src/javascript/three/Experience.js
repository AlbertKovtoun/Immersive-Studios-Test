import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"

import defaultVertexShader from "../../shaders/default/vertex.glsl?raw"
import defaultFragmentShader from "../../shaders/default/fragment.glsl?raw"
import { Environment } from "./Environment"
import { Ground } from "./Ground"
import { Lights } from "./Lights"
import { Model } from "./Model"
import { Rain } from "./Rain"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

export const sizes = new Sizes()

export const environment = new Environment()
scene.background = environment.envMap

export const camera = new Camera()

export const lights = new Lights()

export const ground = new Ground()

export const rain = new Rain()

export const model = new Model()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  if (model.modelGroup) {
    model.update(elapsedTime)
  }

  ground.update(elapsedTime)
  rain.update(elapsedTime)

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  window.requestAnimationFrame(tick)

  stats.end()
}

tick()
