<template>
  <button cursor-pointer flex-center @click="saveResume">
    <span class="iconify pc:text-lg" data-icon="ic:baseline-save" />
  </button>
</template>

<script lang="ts" setup>
import { saveResume } from "~/utils";
</script>
