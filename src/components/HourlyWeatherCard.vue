<script>
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
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      const dateTime = new Date(this.weatherData.dt);
      const formattedTime = dateTime.toLocaleString("en-US", options);
      return formattedTime;
    },
    weatherCode() {
      return this.weatherData.weather[0].id;
    },
    weatherDescription() {
      return this.weatherData.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
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
    <span>{{ weatherDescription }}</span>
  </div>
</template>

<style>
.hourly-weather-card-container {
  border: 1px solid rgb(255, 255, 255);
  height: 17.5vh;
  width: 6.5vw;
  padding: 1%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>
