<template>
  <div
    v-for="(placement, index) in api.getPlacements()"
    :key="index"
    class="toast-container"
  >
    <div :key="placement" v-bind="api.getGroupProps({ placement })">
      <Toast
        v-for="toast in api.getToastsByPlacement(placement)"
        :key="toast.id"
        :actor="toast"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as toast from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/vue";

const nuxtApp = useNuxtApp();

const [state, send] = useMachine(
  toast.group.machine({
    id: "toast",
    placement: "bottom-end",
    duration: 2500
  })
);
const api = computed(() => toast.group.connect(state.value, send, normalizeProps));

nuxtApp.provide("toast", api);
</script>
