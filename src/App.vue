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
    async getCoordinatesInformation({lat, lng}) {
      console.log("params: ", {lat, lng})
      const response = await axios.get(
  `https://api.geocodify.com/v2/reverse?api_key=${
    process.env.VUE_APP_GMAPS_KEY
  }&lat=${lat}&lng=${lng}`
);
      const cityName = response.data.response.features[0].properties.locality;
      const stateName = response.data.response.features[0].properties.region_a;
      return {lat, lng, cityName, stateName};
    },
    createWeatherCard(data) {
      this.$store.commit("addWeatherCard", data);
    },
  },
  beforeMount() {
  // Retrieve weatherCards data from localStorage if it exists
  const weatherCards = localStorage.getItem('weatherCards');
  const parsedWeatherCards = JSON.parse(weatherCards);
  if (parsedWeatherCards && parsedWeatherCards.length > 0) {
    console.log("exists: ", parsedWeatherCards);
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
  } else {
    navigator.geolocation.getCurrentPosition(
     async position => {
       const coordinates = await this.getCoordinatesInformation({lat:position.coords.latitude, lng: position.coords.longitude});
       const weatherData = await this.getWeather(coordinates);
       let weatherCard = {
          cityName: coordinates.cityName,
          stateName: coordinates.stateName,
          data: weatherData,
        };
        this.createWeatherCard(weatherCard);
        let weatherCardsLocalStorage =
          JSON.parse(localStorage.getItem("weatherCards")) || [];
        weatherCardsLocalStorage.push({ coordinates });
        localStorage.setItem(
          "weatherCards",
          JSON.stringify(weatherCardsLocalStorage)
        );
     },
     error => {
       console.log(error.message);
     },
  )   
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
