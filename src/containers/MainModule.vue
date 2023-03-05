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
  currentDate() {
    const date = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
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
  <h1 class="main-header">WeatherVue</h1>
  <h3>{{ currentDate }}</h3>
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
  position: relative;
  bottom: 5.5vh;
  background-color: rgba(50, 50, 50, 0.75) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height 0.2s linear;
}

.cards {
  height: 75vh !important;
  transition: height 0.2s linear;
}
.p-card-header {
  font-size: 3.5rem;
}

.main-header {
  font-family: "rubikregular";
  color: white;
  font-size: 2rem;
}
</style>
