import { createStore } from "vuex";
import TestObject from "./test.json";

const store = createStore({
  state() {
    return {
      weatherCards: [],
    };
  },
  mutations: {
    addWeatherCard(state, card) {
      console.log("checking card in store: ", card);
      state.weatherCards.push(card);
      console.log("state: " + state.weatherCards);
    },
  },
});

if (process.env.NODE_ENV === "development") {
  store.state.weatherCards.push(TestObject);
}

export default store;
