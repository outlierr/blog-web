import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import createRouter from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/css/index.scss";

const app = createApp(App);
const store = createPinia();
const router = createRouter();
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
