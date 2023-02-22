<script>
/* eslint-disable */
import axios from 'axios';
import SearchInput from '@/components/Search.vue';
export default {
  name: "MainModule",
  components: {
    SearchInput,
  },
  data() {
    return {
      inputValue: "",
      loading: false,
    }
  },
};
</script>

<template>
  <h1>WeatherVue</h1>
  <div class="module">
    <!-- <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText class="p-inputtext-lg" placeholder="Type in a city, address, or zip-code to get started" v-model="inputValue" @keyup.enter="HandleEnter">
      </InputText>
    </span> -->
    <SearchInput />
  </div>
</template>

<style>
.module {
  border: 1px solid white;
  height: 33vh;
  width: 33vw;
  background-color: rgba(50, 50, 50, 0.75) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.p-card-header {
  font-size: 3.5rem;
}
</style>
