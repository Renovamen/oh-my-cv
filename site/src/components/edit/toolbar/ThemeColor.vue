<template>
  <ToolItem :text="$t('toolbar.theme_color')" icon="i-material-symbols:palette-outline">
    <!-- Color presets -->
    <div class="flex justify-between mb-4">
      <button
        v-for="(color, i) in THEME_COLORS"
        :key="`${i}-${color}`"
        class="size-6 flex-center rounded text-white"
        :style="{ backgroundColor: color }"
        @click="api.setValue(color)"
      >
        <span
          v-show="getHexString(api.value) === color.toUpperCase()"
          i-line-md:confirm
        />
      </button>
    </div>

    <!-- Color picker -->
    <div v-bind="api.rootProps" relative z-21>
      <div
        v-bind="api.controlProps"
        class="w-full hstack h-9 space-x-2 px-2 py-1 rounded border"
        :class="api.isOpen || isFocus ? 'border-darker-c' : 'border-c'"
      >
        <button v-bind="api.triggerProps">
          <div
            class="size-4 rounded-sm"
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

      <div v-bind="api.positionerProps" w-full ml-2>
        <div
          v-bind="api.contentProps"
          class="bg-c overflow-hidden shadow-md"
          border="~ c rounded"
        >
          <div v-bind="api.getAreaProps()">
            <div v-bind="api.getAreaBackgroundProps()" class="w-full h-30" />
            <div
              v-bind="api.getAreaThumbProps()"
              class="size-4 rounded-full border-2 border-black"
            >
              <span absolute size-3 border="2 white rounded-full" />
            </div>
          </div>

          <div hstack my-3 px-3 space-x-3>
            <button
              v-bind="api.eyeDropperTriggerProps"
              class="flex-center size-7 rounded hover:bg-dark-c"
            >
              <span i-bx:bxs-eyedropper text-lg />
            </button>
            <div v-bind="api.getChannelSliderProps({ channel: 'hue' })" flex-1>
              <div
                v-bind="api.getChannelSliderTrackProps({ channel: 'hue' })"
                class="w-full h-2.5 rounded-full"
              />
              <div
                v-bind="api.getChannelSliderThumbProps({ channel: 'hue' })"
                class="size-4.5 -mt-2 -ml-2"
                border="2 black rounded-full"
              >
                <span absolute size-3.5 border="2 white rounded-full" />
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
