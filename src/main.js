/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Particles from "vue3-particles";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(store);
app.use(Particles);
app.use(Antd);

app.mount("#app");
