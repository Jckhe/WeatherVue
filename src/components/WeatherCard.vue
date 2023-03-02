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
  },
};
</script>

<template>
  <div class="weather-card-container">
    <div class="city-name-container">
      <h1 class="city-name-header">{{ cityName }}, {{ stateName }}</h1>
    </div>
  </div>
</template>

<style>
.weather-card-container {
  border: 1px solid red;
  height: 49.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
