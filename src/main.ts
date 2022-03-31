import { createApp } from "vue";
import App from "./App.vue";
import "windi.css";
import store from "./store";
import "./styles";

const app = createApp(App);
app.use(store).mount("#app");
