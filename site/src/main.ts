import { ViteSSG } from "vite-ssg";
import { setupLayouts } from "virtual:generated-layouts";
import App from "./App.vue";
import generatedRoutes from "~pages";
// @ts-expect-error: missing types
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import VueToast from "vue-toastification";
import type { UserModule } from "./types";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import "vue-toastification/dist/index.css";
import "~/styles/index.css";

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>("./modules/*.ts", {
        eager: true
      })
    ).forEach((i) => i.install?.(ctx));

    // vue slider component
    ctx.app.component("VueSlider", VueSlider);

    // vue toast component
    ctx.app.use(VueToast, {
      timeout: 2500,
      position: "bottom-right"
    });
  }
);
