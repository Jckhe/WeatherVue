<script>
/* eslint-disable */
import axios from 'axios';
import SearchInput from '@/components/Search.vue';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { mapState } from 'vuex';
import CardsContainer from './CardsContainer.vue';
export default {
  name: "MainModule",
  components: {
    SearchInput,
    CardsContainer,
    LeftCircleOutlined,
    RightCircleOutlined,
},
data() {
    return {
      cardsReady: false,
    };
  },
  computed: {
  ...mapState(['weatherCards']),
  length() {
      return this.weatherCards.length;
    },
  currentDate() {
    const date = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  },
  },
  methods: {
    prevSlide() {
      this.$refs.cardsContainer.prevSlide();
    },
    nextSlide() {
      this.$refs.cardsContainer.nextSlide();
    },
  },
watch: {
    weatherCards: {
      immediate: true, // fire the handler immediately when the component is mounted
      handler(newVal, oldVal) {
        if (newVal.length > 0 && !this.cardsReady) {
          this.$nextTick(() => {
            this.cardsReady = true;
          });
        }
      },
      deep: true, // deep watch the weatherCards array
    },
  },
};
</script>

<template>
  <div class="header-container">
    <h1 class="main-header">Weather</h1>
    <h1 class="main-header" style="color: #3eaf7c">Vue</h1>
  </div>
  <h3>{{ currentDate }}</h3>
  <div v-if="length < 1" class="search module">
      <SearchInput />
  </div>
  <div v-if="length > 0" class="cards module">
    <div class="buttons left" @click="prevSlide">
      <left-circle-outlined />
    </div>
    <CardsContainer ref="cardsContainer" />
    <div class="buttons right">
      <right-circle-outlined  @click="nextSlide" />
    </div>
  </div>
  
</template>

<style>
.module {
  border: 1px solid white;
  height: 33vh;
  width: 33vw;
  position: relative;
  bottom: 5.5vh;
  background-color: rgba(50, 50, 50, 0.75) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height 0.2s linear;
}

.buttons {
  position: absolute;
  font-size: 2.5rem;
  color: rgb(245, 245, 245);
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.buttons:hover {
  opacity: 1;
  transform: scale(1.05);
  transition: all 0.15s ease-in-out;
}

.left {
  right: 103%;
}

.right {
  left: 103%;
}


.cards {
  height: 75vh !important;
  transition: height 0.2s linear;
}
.p-card-header {
  font-size: 3.5rem;
}

.header-container {
  display: flex;
  flex-direction: row;
}

.main-header {
  font-family: "rubikregular";
  color: white;
  font-size: 2rem;
}
</style>
