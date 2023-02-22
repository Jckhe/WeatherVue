/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Particles from "vue3-particles";

import "./theme.css";

const app = createApp(App);

app.use(store);
app.use(Particles);

app.mount("#app");
