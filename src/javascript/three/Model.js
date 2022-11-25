import * as THREE from "three"
import { loaders, model, scene } from "./Experience"

export class Model {
  constructor() {
    this.setModel()
  }

  setModel() {
    loaders.gltfLoader.load("/models/model.glb", (gltf) => {
      this.modelGroup = gltf.scene

      this.mountain = this.modelGroup.getObjectByName("Mountain")

      scene.add(this.modelGroup)
    })
  }

  update(elapsedTime) {
    this.mountain.rotation.y = elapsedTime * 0.2
  }
}
