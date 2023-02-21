/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Particles from "vue3-particles";
import PrimeVue from "primevue/config";
import InputSwitch from "primevue/inputswitch";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";

import "./theme.css";

const app = createApp(App);

app.use(store);
app.use(Particles);
app.use(PrimeVue);

app.component("InputSwitch", InputSwitch);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("ProgressSpinner", ProgressSpinner);

app.mount("#app");
