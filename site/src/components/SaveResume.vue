<template>
  <NavItem icon="ic:baseline-save" @click="saveResume" />
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
