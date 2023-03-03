<script>
import Cloudy from "../assets/icons/weather/cloudy.svg";
import CloudyWithSun from "../assets/icons/weather/cloudy-with-sun.svg";
import Clear from "../assets/icons/weather/clear.svg";
export default {
  name: "WeatherCard",
  props: {
    cityName: {
      type: String,
      required: true,
    },
    stateName: {
      type: String,
      required: true,
    },
    weatherData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getWeatherSvg(weatherCode) {
      switch (weatherCode) {
        case 800:
          return Clear;
        case 803 || 804:
          return Cloudy;
        case 801 || 802:
          return CloudyWithSun;
      }
    },
  },
  computed: {
    formattedTitle() {
      return `${this.cityName}, ${this.stateName}`;
    },
    weatherCode() {
      console.log("code: ", this.weatherData.current.weather[0].id);
      return this.weatherData.current.weather[0].id;
    },
    weatherDescription() {
      console.log("desc: ", this.weatherData.current.weather[0].main);
      return this.weatherData.current.weather[0].main;
    },
    currentTemperature() {
      console.log("current temp: ", this.weatherData.current.temp);
      return this.weatherData.current.temp;
    },
    titleStyle() {
      return {
        color: "white",
      };
    },
    titleStyleNoBorder() {
      return {
        color: "white",
        border: "none",
      };
    },
  },
};
</script>

<template>
  <a-card
    :title="formattedTitle"
    :headStyle="titleStyle"
    :bordered="false"
    class="weather-card-container"
  >
    <a-card
      class="current-weather-container"
      :headStyle="titleStyleNoBorder"
      :bordered="true"
    >
      <div class="inner-current-weather-container">
        <!-- <img :src="getWeatherSvg(weatherCode)" alt="Image" /> -->
        <h3>{{ weatherDescription }}</h3>
        <a-avatar :src="getWeatherSvg(weatherCode)" :size="128" />
        <h3>{{ currentTemperature }}</h3>
      </div>
    </a-card>
  </a-card>
</template>

<style>
.weather-card-container {
  background-color: transparent !important;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.current-weather-container {
  background-color: transparent !important;
}

.inner-current-weather-container {
  border: 1px solid blue;
}

.inner-current-weather-container h3 {
  color: white;
}
</style>
