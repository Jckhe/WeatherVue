<script>
import { mapState } from "vuex";
import WeatherCard from "@/components/WeatherCard.vue";
import SearchInput from "@/components/Search.vue";
export default {
  name: "CardsContainer",
  components: {
    WeatherCard,
    SearchInput,
  },
  computed: {
    ...mapState(["weatherCards"]),
    currentHour() {
      const now = new Date();
      const currentHourStart =
        (Math.floor(now.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000)) /
        1000;
      return currentHourStart;
    },
  },
  methods: {
    prevSlide() {
      this.$refs.carousel.prev();
    },
    nextSlide() {
      this.$refs.carousel.next();
    },
  },
  watch: {
    weatherCards: {
      handler() {
        console.log(this.weatherCards.length);
        this.$nextTick(() => {
          //goes to the last slide AFTER a new weathercard has been added.
          this.$refs.carousel.goTo(this.weatherCards.length - 1, false);
        });
      },
      deep: true,
    },
  },
  setup() {
    const onChange = (current) => {
      console.log(current);
    };

    return {
      onChange,
    };
  },
};
</script>

<template>
  <div class="carousel-container">
    <a-carousel
      :key="weatherCards.length"
      ref="carousel"
      :after-change="onChange"
    >
      <template #prevArrow>
        <div class="custom-slick-arrow">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow">
          <right-circle-outlined />
        </div>
      </template>
      <WeatherCard
        v-for="(item, index) in weatherCards"
        :cityName="item.cityName"
        :stateName="item.stateName"
        :weatherData="item.data"
        :currentHour="currentHour"
        :key="index"
      />
      <div id="search-carousel">
        <div id="inner-search-container">
          <SearchInput />
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<style>
#search-carousel {
  width: 90%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#inner-search-container {
  height: fit-content;
  margin-top: 52.5%;
  width: 100%;
  margin-left: 5%;
}
.carousel-container {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  border: 1px solid green;
}
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
  z-index: 100;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 40;
}
</style>
