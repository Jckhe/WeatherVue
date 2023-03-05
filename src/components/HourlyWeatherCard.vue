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
    timestamp: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      const dateTime = new Date(this.timestamp * 1000);
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedTime = formatter.format(dateTime);
      console.log("formatted time: ", formattedTime);
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
    formattedTemperature() {
      return `${this.temperature}° F`;
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
    <span>{{ formattedTime }}</span>
    <a-avatar :src="setWeatherSvg(weatherCode)" :size="50" shape="square" />
    <span>{{ formattedTemperature }}</span>
    <span class="weather-description">{{ weatherDescription }}</span>
  </div>
</template>

<style>
.hourly-weather-card-container {
  border: 1px solid rgb(255, 255, 255);
  min-height: 22.5vh;
  max-height: 22.5vh;
  min-width: 25%;
  max-width: 25%;
  padding: 1%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.weather-description {
  line-height: 85%;
}
</style>
