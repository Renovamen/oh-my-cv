<template>
  <EditorToolbarBox
    :text="$t('toolbar.theme_color')"
    icon="i-material-symbols:palette-outline"
  >
    <!-- Color presets -->
    <div class="flex justify-between mb-4">
      <button
        v-for="(color, i) in COLOR.PRESET"
        :key="`${i}-${color}`"
        class="size-6 flex-center rounded text-white"
        :style="{ backgroundColor: color }"
        @click="api.setValue(color)"
      >
        <span v-show="toHex(api.value) === color.toUpperCase()" i-line-md:confirm />
      </button>
    </div>

    <!-- Color picker -->
    <div v-bind="api.getRootProps()" relative z-21>
      <div
        v-bind="api.getControlProps()"
        :class="[
          'w-full hstack h-9 space-x-2 px-2 py-1 rounded-md border-1.5',
          (api.open || isFocus) && 'border-primary'
        ]"
      >
        <button v-bind="api.getTriggerProps()">
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

      <div v-bind="api.getPositionerProps()" w-full ml-2>
        <div
          v-bind="api.getContentProps()"
          class="bg-background overflow-hidden shadow-md"
          border="~ rounded-md"
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
              v-bind="api.getEyeDropperTriggerProps()"
              class="flex-center size-7 rounded hover:(bg-accent text-accent-foreground)"
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
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import * as colorPicker from "@zag-js/color-picker";
import { normalizeProps, useMachine } from "@zag-js/vue";

const { styles, setStyle } = useStyleStore();
const { COLOR } = useConstant();

const isFocus = ref(false);

const [state, send] = useMachine(
  colorPicker.machine({
    id: "theme-color",
    value: colorPicker.parse(styles.themeColor),
    positioning: {
      gutter: 14
    },
    onValueChange: (details) => setStyle("themeColor", toHex(details.value))
  })
);
const api = computed(() => colorPicker.connect(state.value, send, normalizeProps));

const toHex = (value: colorPicker.Color) =>
  "#" + value.toHexInt().toString(16).toUpperCase().padStart(6, "0");
</script>
