import * as toast from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/vue";

export default defineNuxtPlugin(() => {
  const [state, send] = useMachine(
    toast.group.machine({
      id: "toast",
      placement: "bottom-end",
      duration: 2500,
      removeDelay: 750
    })
  );
  const toastApi = computed(() => toast.group.connect(state.value, send, normalizeProps));

  return {
    provide: {
      toast: toastApi
    }
  };
});
