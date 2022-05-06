import { createApp } from "vue";
import App from "~/App.vue";
import store from "~/store";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "~/styles/index.css";

const app = createApp(App);
app.use(store).mount("#app");
