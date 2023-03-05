<script>
import HourlyWeatherCard from "./HourlyWeatherCard.vue";
import { getWeatherSvg } from "@/helper/getWeatherSvg";
import { weatherSVG } from "@/helper/weatherSvg";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "WeatherCard",
  components: {
    HourlyWeatherCard,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined,
    DeleteOutlined,
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
    currentHour: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  methods: {
    setWeatherSvg(weatherCode) {
      return weatherSVG(getWeatherSvg(weatherCode));
    },
    scrollFarLeft() {
      const hourlyContainer = document.querySelector(
        ".carousel-hourly-container"
      );
      hourlyContainer.scrollBy({
        left: -550,
        behavior: "smooth",
      });
    },
    scrollFarRight() {
      const hourlyContainer = document.querySelector(
        ".carousel-hourly-container"
      );
      hourlyContainer.scrollBy({
        left: 550,
        behavior: "smooth",
      });
    },
    scrollLeft() {
      const hourlyContainer = document.querySelector(
        ".carousel-hourly-container"
      );
      hourlyContainer.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    },
    scrollRight() {
      const hourlyContainer = document.querySelector(
        ".carousel-hourly-container"
      );
      hourlyContainer.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    },
    handleOk() {
      this.$store.commit("deleteWeatherCard", {
        lat: this.weatherData.lat,
        lon: this.weatherData.lon,
      });
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
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
    weatherLowHigh() {
      return this.weatherData.daily[0].temp;
    },
    currentTemperature() {
      console.log("current temp: ", this.weatherData.current.temp);
      return `${this.weatherData.current.temp}° F`;
    },
    hourlyWeatherData() {
      const sorted = this.weatherData.hourly.filter(
        (item) => item.dt >= this.currentHour
      );
      console.log("this Hour: ", this.currentHour);
      console.log("sorted: ", sorted);
      return sorted;
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
    <a-modal
      v-model:visible="visible"
      title="Delete Confirmation"
      @ok="handleOk"
      width="20%"
      centered
      ref="modal"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="danger"
          :loading="loading"
          @click="handleOk"
          >Delete</a-button
        >
      </template>
      <p>Are you sure you want to delete this weather card?</p>
    </a-modal>
    <div class="delete-button-container">
      <a-button @click="showModal" class="delete-button">
        <template #icon>
          <delete-outlined class="delete-button-svg" style="color: white" />
        </template>
      </a-button>
    </div>
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
            <div class="min-max-container">
              <span>Low: {{ weatherLowHigh.min }}°F</span>
              <span>High: {{ weatherLowHigh.max }}°F</span>
            </div>
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
            <a-button @click="scrollFarLeft"
              ><template #icon><double-left-outlined /></template
            ></a-button>
            <a-button @click="scrollLeft"
              ><template #icon><left-outlined /></template
            ></a-button>
            <a-button @click="scrollRight"
              ><template #icon><right-outlined /></template
            ></a-button>
            <a-button @click="scrollFarRight"
              ><template #icon><double-right-outlined /></template
            ></a-button>
          </div>
          <div class="carousel-hourly-outer-container">
            <div class="carousel-hourly-container">
              <HourlyWeatherCard
                v-for="(item, index) in hourlyWeatherData.slice(0, 24)"
                :weatherData="item"
                :timestamp="item.dt"
                :temperature="item.temp"
                :key="index"
              />
            </div>
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="daily" tab="Daily">
        <!-- Hourly weather content goes here -->
        <div class="carousel-daily-container">
          <a-empty>
            <template #description>
              <span style="color: white"> Under Construction! - Jackie </span>
            </template>
          </a-empty>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<style>
.weather-card-container {
  background-color: transparent !important;
  height: 76vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.current-weather-container {
  background-color: transparent !important;
  border: 0.5px solid rgba(128, 128, 128, 0.5);
  border-radius: 2%;
  cursor: pointer;
}

.hourly-weather-container {
  background-color: transparent !important;
  border: 0.5px solid rgba(128, 128, 128, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.carousel-hourly-outer-container {
  margin-top: 1%;
  min-width: 27.5vw;
  max-width: 27.5vw;
  padding: 3%;
}

.carousel-hourly-container {
  border: 1px solid rgb(75, 75, 75);
  width: 100%;
  min-height: 27vh;
  gap: 1vh;
  display: flex;
  flex-direction: row;
  overflow-x: auto !important;
  justify-content: center;
  align-items: center;
  padding-left: 1vw;
  padding-right: 1vw;
}

.carousel-daily-container {
  border: 1px solid rgb(75, 75, 75);
  width: 100%;
  min-height: 27vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hourly-cards {
  display: flex;
  flex-direction: row;
}

.scroll-buttons {
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 5%;
  padding: 1%;
}

.scroll-buttons button {
  width: 12.5%;
}

.min-max-container {
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  position: relative;
  bottom: 1vh;
  flex-direction: row;
  justify-content: space-between;
  width: 55%;
}

.min-max-container span {
  color: white;
}

.carousel-hourly-container .hourly-weather-card-container:first-child {
  margin-left: 550%;
}

.carousel-hourly-container .hourly-weather-card-container:last-child {
  margin-right: 0.3vw;
}

.delete-button-container {
  position: absolute;
  height: 0;
  width: 0;
}

.delete-button {
  color: white;
  position: relative;
  cursor: pointer;
  left: 27.5vw;
  background-color: transparent !important;
}

.delete-button-svg {
  font-size: 1.5rem;
}

.ant-tabs-nav {
  color: white !important;
}
</style>
