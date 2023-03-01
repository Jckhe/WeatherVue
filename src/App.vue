<!-- eslint-disable prettier/prettier -->
<script>
import Background from './containers/Background.vue';
import MainModule from './containers/MainModule.vue';


export default {
  name: "App",
  components: {
    Background,
    MainModule,
  },
  data() {
    return {
      checked1: false,
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    }
  }
};
</script>

<template>
  <div class="main-container">
    <MainModule />
    <Background />
  </div>
</template>

<style>
.main-container {
  min-width: 99vw;
  min-height: 99.5vh;
  max-height: 99.5vh;
  max-width: 99vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#test {
  border: 1px solid black;
  height: 30%;
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
