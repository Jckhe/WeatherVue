<script>
/* eslint-disable */
import axios from 'axios';
export default {
  name: "MainModule",
  data() {
    return {
      inputValue: "",
      loading: false,
      currentTemp: "",
    }
  },
  methods: {
    async HandleEnter() {
      console.log("Here")
      this.toggleLoading();
      let response = await axios.get(`https://api.geocodify.com/v2/geocode?api_key=${process.env.VUE_APP_GMAPS_KEY}&q=${encodeURIComponent(this.inputValue)}`);
      response = response.data.response.features[0].geometry.coordinates
      const lng = response[0]
      const lat = response[1]
      console.log("PROCESS: ", process.env)
      let weather = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=imperial&appid=${process.env.VUE_APP_WEATHER_API_KEY}`)
      console.log("weather: ", weather)
      this.toggleLoading();
    },
    toggleLoading() {
      this.loading = !this.loading;
    }
  },
};
</script>

<template>
  <h1>WeatherVue</h1>
  <div class="module">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText class="p-inputtext-lg" placeholder="Type in a city, address, or zip-code to get started" v-model="inputValue" @keyup.enter="HandleEnter">
      </InputText>
    </span>
    
    <ProgressSpinner v-if="loading" style="width:50px;height:50px" strokeWidth="5" fill="white" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
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
