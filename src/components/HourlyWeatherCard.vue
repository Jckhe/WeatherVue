<script>
import { formatTime } from "@/helper/formatTime";
import { getWeatherSvg } from "@/helper/getWeatherSvg";
import { weatherSVG } from "@/helper/weatherSvg";
export default {
  name: "HourlyWeatherCard",
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    time() {
      return formatTime(this.weatherData.dt);
    },
    weatherCode() {
      return this.weatherData.weather[0].id;
    },
    weatherDescription() {
      
    }
  },
  methods: {
    setWeatherSvg(weatherCode) {
      return weatherSVG(getWeatherSvg(weatherCode));
    },
  },
};
</script>

<template>
  <div class="hourly-weather-card-container">
    <span>{{ time }}</span>
    <a-avatar :src="setWeatherSvg(weatherCode)" :size="50" shape="square" />
    <span></span>
  </div>
</template>

<style>
.hourly-weather-card-container {
  border: 1px solid red;
  height: 17.5vh;
  width: 7.5vw;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
