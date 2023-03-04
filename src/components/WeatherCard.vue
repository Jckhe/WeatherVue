<script>
import HourlyWeatherCard from "./HourlyWeatherCard.vue";
import { getWeatherSvg } from "@/helper/getWeatherSvg";
import { weatherSVG } from "@/helper/weatherSvg";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons-vue";
export default {
  name: "WeatherCard",
  components: {
    HourlyWeatherCard,
    DoubleLeftOutlined,
    DoubleRightOutlined,
  },
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
    setWeatherSvg(weatherCode) {
      return weatherSVG(getWeatherSvg(weatherCode));
    },
    scrollLeft() {
      const hourlyContainer = document.querySelector(".inner-hourly-container");
      hourlyContainer.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    },
    scrollRight() {
      const hourlyContainer = document.querySelector(".inner-hourly-container");
      hourlyContainer.scrollBy({
        left: 100,
        behavior: "smooth",
      });
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
    weatherCondition() {
      console.log("cond: ", this.weatherData.current.weather[0].main);
      return this.weatherData.current.weather[0].main;
    },
    weatherDescription() {
      console.log("desc: ", this.weatherData.current.weather[0].description);
      return this.weatherData.current.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    currentTemperature() {
      console.log("current temp: ", this.weatherData.current.temp);
      return `${this.weatherData.current.temp}° F`;
    },
    hourlyWeatherData() {
      console.log("hourly:", this.weatherData.hourly);
      return this.weatherData.hourly;
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
    testData() {
      return {
        dt: 1677690000,
        temp: 50.72,
        feels_like: 48.78,
        pressure: 1009,
        humidity: 70,
        dew_point: 41.31,
        uvi: 1.08,
        clouds: 89,
        visibility: 10000,
        wind_speed: 15.66,
        wind_deg: 254,
        wind_gust: 21.88,
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        pop: 1,
        rain: {
          "1h": 0.12,
        },
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
    <a-tabs
      v-model:selectedTab="current"
      :tabBarStyle="{
        display: 'flex',
        justifyContent: 'center',
        width: '49.5%',
        alignSelf: 'center',
        padding: '2.5%',
        color: 'white',
        // border: '1px solid red',
      }"
    >
      <a-tab-pane key="current" tab="Current">
        <a-card
          class="current-weather-container"
          hoverable
          :headStyle="titleStyleNoBorder"
          :bordered="false"
        >
          <div class="inner-current-weather-container">
            <h3>{{ weatherCondition }}</h3>
            <a-avatar
              :src="setWeatherSvg(weatherCode)"
              :size="128"
              shape="square"
            />
            <h3>{{ currentTemperature }}</h3>
            <h3>{{ weatherDescription }}</h3>
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="hourly" tab="Hourly">
        <!-- Hourly weather content goes here -->
        <a-card
          class="hourly-weather-container"
          :headStyle="titleStyleNoBorder"
          :bordered="false"
        >
          <div class="scroll-buttons">
            <a-button @click="scrollLeft"
              ><template #icon><double-left-outlined /></template
            ></a-button>
            <a-button @click="scrollRight"
              ><template #icon><double-right-outlined /></template
            ></a-button>
          </div>
          <div class="inner-hourly-container">
            <HourlyWeatherCard
              v-for="(item, index) in hourlyWeatherData"
              :weatherData="item"
              :timestamp="item.dt"
              :temperature="item.temp"
              :key="index"
            />
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="daily" tab="Daily">
        <!-- Hourly weather content goes here -->
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<style>
.weather-card-container {
  background-color: transparent !important;
  height: 73vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.current-weather-container {
  background-color: transparent !important;
  border: 1px solid grey;
  border-radius: 15%;
}

.hourly-weather-container {
  background-color: transparent !important;
  border: 1px solid grey;
  border-radius: 15%;
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.inner-current-weather-container {
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
}

.inner-current-weather-container h3 {
  color: white;
}

.inner-hourly-container {
  border: 1px solid green;
  width: 100%;
  min-height: 27vh;
  max-height: 100%;
  gap: 1vh;
  display: flex;
  flex-direction: row;
  overflow-x: auto !important;
  overflow-y: hidden;
  justify-content: center;
}

.hourly-cards {
  display: flex;
  flex-direction: row;
}

.scroll-buttons {
  border: 1px solid grey;
  width: 25%;
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 20%;
  padding: 1%;
}

.ant-tabs-nav {
  color: white !important;
}
</style>
