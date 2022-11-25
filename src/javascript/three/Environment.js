import { loaders } from "./Experience"

export class Environment {
  constructor() {
    this.envMap = loaders.cubeTextureLoader.load([
      "/images/TropicalSunnyDay_px.jpg",
      "/images/TropicalSunnyDay_nx.jpg",
      "/images/TropicalSunnyDay_py.jpg",
      "/images/TropicalSunnyDay_ny.jpg",
      "/images/TropicalSunnyDay_pz.jpg",
      "/images/TropicalSunnyDay_nz.jpg",
    ])
  }
}
