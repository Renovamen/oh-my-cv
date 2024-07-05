<template>
  <UiButton
    variant="ghost-secondary"
    size="round"
    :aria-label="$t('toggle_theme')"
    @click="switchMode"
  >
    <div
      v-for="mode in modes"
      :class="[
        'absolute transition-transform duration-500',
        mode.icon,
        transform(mode.value)
      ]"
    />
  </UiButton>
</template>

<script lang="ts" setup>
type ModeValue = "light" | "dark" | "system";

const modes: Array<{ value: ModeValue; icon: string }> = [
  {
    value: "system",
    icon: "i-material-symbols:night-sight-auto-rounded size-4.5"
  },
  {
    value: "light",
    icon: "i-ph:sun-bold size-4"
  },
  {
    value: "dark",
    icon: "i-ph:moon-bold size-4"
  }
];

const colorMode = useColorMode();

const _findModeIndex = (mode: string) => modes.findIndex((m) => m.value === mode);

const _findNeighbourMode = (mode: string, position: -1 | 1) => {
  const index = _findModeIndex(mode);
  return modes[(modes.length + index + position) % modes.length].value;
};

const switchMode = () => {
  colorMode.preference = _findNeighbourMode(colorMode.preference, 1);
};

const transform = (mode: ModeValue) => {
  return colorMode.preference === mode
    ? "scale-100 rotate-0"
    : colorMode.preference === _findNeighbourMode(mode, -1)
      ? "scale-0 rotate-90"
      : "scale-0 -rotate-90";
};
</script>
