<!-- eslint-disable prettier/prettier -->
<script>
import Background from './containers/Background.vue';
import MainModule from './containers/MainModule.vue';
import axios from 'axios';

export default {
  name: "App",
  components: {
    Background,
    MainModule,
  },
  data() {
    return {
      checked1: false,
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  mounted() {
    document.title = 'WeatherVue | Jckhe';
  },
  methods: {
    async getWeather({ lat, lng }) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=imperial&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
      );
      return response.data;
    },
    createWeatherCard(data) {
      this.$store.commit("addWeatherCard", data);
    },
  },
  beforeMount() {
  // Retrieve weatherCards data from localStorage if it exists
  const weatherCards = localStorage.getItem('weatherCards');
  if (weatherCards) {
    const parsedWeatherCards = JSON.parse(weatherCards);
    console.log("Exists: ", parsedWeatherCards);
    parsedWeatherCards.forEach( async (card) => {
      console.log("Card: ", card);
      let weatherData = await this.getWeather(card.coordinates)
      console.log("weatherData: ", weatherData)
      let weatherCard = {
          cityName: card.coordinates.cityName,
          stateName: card.coordinates.stateName,
          data: weatherData,
        };
      this.createWeatherCard(weatherCard);
    });
  }
}
};
</script>

<template>
  <div class="main-container">
    <MainModule />
    <Background />
  </div>
</template>

<style>
.main-container {
  min-width: 99vw;
  min-height: 99.5vh;
  max-height: 99.5vh;
  max-width: 99vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#test {
  border: 1px solid black;
  height: 30%;
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
