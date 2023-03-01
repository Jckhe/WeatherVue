<script>
import axios from "axios";
import LoadingIndicator from "../assets/icons/LoadingIndicator.svg";
export default {
  name: "SearchInput",
  data() {
    return {
      inputValue: "",
      loading: false,
      isFocused: false,
    };
  },
  props: {
    LoadingIndicator: {
      type: String,
      default: LoadingIndicator,
    },
  },
  methods: {
    async handleEnter() {
      this.toggleLoading();
      try {
        const coordinates = await this.getCoordinates();
        const weatherData = await this.getWeather(coordinates);
        // create weathercard object here
        const weatherCard = {
          cityName: coordinates.cityName,
          data: weatherData,
        };
        this.createWeatherCard(weatherCard);
      } catch (error) {
        console.error(error);
        this.toggleLoading();
      } finally {
        this.toggleLoading();
      }
    },
    async getCoordinates() {
      const response = await axios.get(
        `https://api.geocodify.com/v2/geocode?api_key=${
          process.env.VUE_APP_GMAPS_KEY
        }&q=${encodeURIComponent(this.inputValue)}`
      );
      console.log("get coord results: ", response);
      const coordinates =
        response.data.response.features[0].geometry.coordinates;
      const cityName = response.data.response.features[0].properties.locality;
      const lng = coordinates[0];
      const lat = coordinates[1];
      return { lat, lng, cityName };
    },
    async getWeather({ lat, lng }) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=imperial&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
      );
      return response.data;
    },
    createWeatherCard(data) {
      this.$store.commit("addWeatherCard", data);
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>

<template>
  <div class="text-input-container">
    <input
      type="text"
      v-model="this.inputValue"
      @keyup.enter="handleEnter"
      class="text-input"
      :placeholder="
        inputValue || isFocused
          ? ''
          : 'Type in a city, address, or zip-code to get started'
      "
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div
      v-if="loading"
      class="icon-slot"
      :style="{ 'background-image': `url(${LoadingIndicator})` }"
    ></div>
  </div>
</template>

<style>
.text-input-container {
  display: flex;
  position: relative;
  width: 90%;
}

.text-input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 4px;
  text-align: center;
}

.text-input:focus {
  background-color: white;
  color: black;
}

.icon-slot {
  position: absolute;
  top: 5%;
  right: 2.5%;
  width: 7.25%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
