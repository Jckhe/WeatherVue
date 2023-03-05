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
    deleteWeatherCard(state, coordinates) {
      console.log("checking delete card in store: ", coordinates);
      const index = state.weatherCards.findIndex(
        (card) =>
          card.data.lat === coordinates.lat && card.data.lon === coordinates.lon
      );
      if (index !== -1) {
        state.weatherCards.splice(index, 1);
      }
      const weatherCards = localStorage.getItem("weatherCards");
      if (weatherCards) {
        const parsedWeatherCards = JSON.parse(weatherCards);
        const index = parsedWeatherCards.findIndex(
          (item) =>
            item.coordinates.lat === coordinates.lat &&
            item.coordinates.lon === coordinates.lon
        );
        parsedWeatherCards.splice(index, 1);
        localStorage.setItem(
          "weatherCards",
          JSON.stringify(parsedWeatherCards)
        );
      }
      console.log("state after del: " + state.weatherCards);
    },
  },
});

if (process.env.NODE_ENV === "development") {
  store.state.weatherCards.push(TestObject);
}

export default store;
