<template>
  <button cursor-pointer flex-center @click="saveResume">
    <span class="iconify pc:text-lg" data-icon="ic:baseline-save" />
  </button>
</template>

<script lang="ts" setup>
import { saveResume } from "~/utils";

const { ctrl_s, meta_s } = useMagicKeys({
  passive: false,
  onEventFired: (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown")
      e.preventDefault();
  }
});

watch([ctrl_s, meta_s], ([cs, ms]) => {
  if (cs || ms) saveResume();
});
</script>
