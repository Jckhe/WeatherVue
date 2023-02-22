import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      weatherCards: [],
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addWeatherCard(state, card) {
      state.weatherCards.push(card);
      console.log("state: " + state.weatherCards);
    },
  },
});

export default store;
