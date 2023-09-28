// @ts-expect-error: missing types
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("VueSlider", VueSlider);
});
