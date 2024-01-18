<template>
  <ToolItem :text="$t('toolbar.theme_color')" icon="material-symbols:palette-outline">
    <!-- Color presets -->
    <div class="flex justify-between mb-4">
      <button
        v-for="(color, i) in THEME_COLORS"
        :key="`${i}-${color}`"
        class="w-6 h-6 rounded text-white"
        :style="{ backgroundColor: color }"
        @click="api.setValue(color)"
      >
        <div
          v-show="getHexString(api.value) === color.toUpperCase()"
          class="w-full h-full flex-center"
        >
          <client-only>
            <span class="iconify" data-icon="line-md:confirm" />
          </client-only>
        </div>
      </button>
    </div>

    <!-- Color picker -->
    <div v-bind="api.rootProps" relative z-21>
      <div
        v-bind="api.controlProps"
        class="w-full hstack h-9 space-x-2 px-2 py-1 rounded border"
        :class="[api.isOpen || isFocus ? 'border-darker-c' : 'border-c']"
      >
        <button v-bind="api.triggerProps">
          <div
            class="w-4 h-4 rounded-sm"
            v-bind="api.getSwatchProps({ value: api.value })"
          />
        </button>
        <input
          v-bind="api.getChannelInputProps({ channel: 'hex' })"
          class="bg-transparent outline-none"
          @focus="isFocus = true"
          @blur="isFocus = false"
        />
      </div>

      <div
        v-bind="api.positionerProps"
        class="w-full bg-c border border-c rounded overflow-hidden shadow-md ml-2"
      >
        <div v-bind="api.contentProps">
          <div v-bind="api.getAreaProps()">
            <div v-bind="api.getAreaBackgroundProps()" class="w-full h-30" />
            <div
              v-bind="api.getAreaThumbProps()"
              class="h-4 w-4 rounded-full border-2 border-black"
            >
              <span class="absolute h-3 w-3 rounded-full border-2 border-white" />
            </div>
          </div>

          <div hstack my-3 px-3 space-x-3>
            <button
              v-bind="api.eyeDropperTriggerProps"
              class="flex-center h-7 w-7 rounded hover:bg-dark-c"
            >
              <client-only>
                <span class="iconify text-lg" data-icon="bx:bxs-eyedropper" />
              </client-only>
            </button>
            <div v-bind="api.getChannelSliderProps({ channel: 'hue' })" flex-1>
              <div
                v-bind="api.getChannelSliderTrackProps({ channel: 'hue' })"
                class="w-full h-2.5 rounded-full"
              />
              <div
                v-bind="api.getChannelSliderThumbProps({ channel: 'hue' })"
                class="h-4.5 w-4.5 -mt-2 -ml-2 rounded-full border-2 border-black"
              >
                <span class="absolute h-3.5 w-3.5 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
import * as colorPicker from "@zag-js/color-picker";
import { normalizeProps, useMachine } from "@zag-js/vue";

const { styles, setStyle } = useStyleStore();
const isFocus = ref(false);

const [state, send] = useMachine(
  colorPicker.machine({
    id: "theme-color",
    value: colorPicker.parse(styles.themeColor),
    positioning: {
      gutter: 14
    },
    onValueChange: (details) => setStyle("themeColor", getHexString(details.value))
  })
);
const api = computed(() => colorPicker.connect(state.value, send, normalizeProps));

watch(
  () => styles.themeColor,
  () => api.value.setValue(colorPicker.parse(styles.themeColor))
);

const getHexString = (value: colorPicker.Color) => {
  return "#" + value.toHexInt().toString(16).toUpperCase().padStart(6, "0");
};
</script>
