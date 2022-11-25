import * as THREE from "three"
import { scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
  }

  setLights() {
    this.am = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(this.am)

    this.pl = new THREE.PointLight("white", 1)
    this.pl.position.set(0, 2, 1)
    scene.add(this.pl)
  }
}
