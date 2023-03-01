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
    <a-carousel>
      <WeatherCard
        v-for="(item, index) in weatherCards"
        :cityName="item.cityName"
        :key="index"
      />
      <div id="search-carousel">
        <SearchInput />
      </div>
    </a-carousel>
  </div>
</template>

<style>
#search-carousel {
  width: 120%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
</style>
