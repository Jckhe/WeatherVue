<script>
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
  computed: {
    formattedTitle() {
      return `${this.cityName}, ${this.stateName}`;
    },
    titleStyle() {
      return {
        color: "white",
      };
    },
  },
};
</script>

<template>
  <a-card
    :title="formattedTitle"
    :headStyle="titleStyle"
    class="weather-card-container"
  >
  </a-card>
</template>

<style>
.weather-card-container {
  border: 1px solid red;
  background-color: transparent !important;
  height: 49.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  color: white !important;
}
</style>
