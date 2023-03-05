import { createStore } from "vuex";
import TestObject from "./test.json";

if (process.env.NODE_ENV === "production") {
  // do something specific to production mode
  console.log("Production mode");
} else {
  // do something specific to development mode
  console.log("Development mode");
}

const store = createStore({
  state() {
    return {
      weatherCards: [TestObject],
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

export default store;
