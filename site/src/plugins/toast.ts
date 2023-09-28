import VueToast from "vue-toastification";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueToast, {
    timeout: 2500,
    position: "bottom-right"
  });
});
