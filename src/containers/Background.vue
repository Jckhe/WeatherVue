<!-- eslint-disable no-unused-vars -->
<script>
import { loadFull } from "tsparticles";
import defaultBG from "./defaultbg.json";

const particlesInit = async (engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Background",
  data() {
    return {
      defaultBG: defaultBG,
    };
  },
  methods: {
    async particlesInit(engine) {
      await loadFull(engine);
    },
    particlesLoaded(container) {
      console.log("Particles container loaded", container);
    },
  },
};
</script>

<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
  />

  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="defaultBG"
  />
</template>
