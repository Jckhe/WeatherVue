<script>
/* eslint-disable */
import axios from 'axios';
import SearchInput from '@/components/Search.vue';

import { mapState } from 'vuex';
import CardsContainer from './CardsContainer.vue';
export default {
  name: "MainModule",
  components: {
    SearchInput,
    CardsContainer
},
  computed: {
  ...mapState(['weatherCards']),
  length() {
      return this.weatherCards.length;
    },
  },
  watch: {
    weatherCards: {
      handler(newValue, oldValue) {
        console.log('weatherCards changed from ', oldValue, ' to ', newValue);
      },
      deep: true,
    },
  },
};
</script>

<template>
  <h1>WeatherVue</h1>
  <div v-if="length < 1" class="search module">
      <SearchInput />
  </div>
  <div v-if="length > 0" class="cards module">
    <CardsContainer />
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
  transition: height 0.2s linear;
}

.cards {
  height: 50vh !important;
  transition: height 0.2s linear;
}
.p-card-header {
  font-size: 3.5rem;
}
</style>
