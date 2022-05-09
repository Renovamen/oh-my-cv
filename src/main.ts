import { createApp } from "vue";
import App from "~/App.vue";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "~/styles/index.css";

const app = createApp(App);

Object.values(import.meta.globEager("./modules/*.ts")).forEach((i) =>
  i.install?.(app)
);

app.mount("#app");
