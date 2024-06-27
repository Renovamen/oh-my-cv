import { defineComponent, ref, computed, h } from "vue";
import { useElementSize } from "@vueuse/core";
import type { VNode } from "vue";

export default defineComponent({
  name: "Zoom",

  props: {
    scale: {
      type: Number,
      required: true
    }
  },

  setup(props, { slots }) {
    const container = ref<HTMLElement>();
    const zoom = ref<HTMLElement>();

    const sizeC = useElementSize(container);
    const sizeZ = useElementSize(zoom);

    const left = computed(() =>
      Math.max(0, (sizeC.width.value - props.scale * sizeZ.width.value) / 2)
    );

    return (): VNode =>
      h(
        "div",
        {
          class: "vue-zoom-container",
          ref: container,
          style: {
            height: "100%"
          }
        },
        [
          h(
            "div",
            {
              class: "vue-zoom",
              ref: zoom,
              style: {
                width: "fit-content",
                transformOrigin: "top left",
                transform: `scale(${props.scale})`,
                marginLeft: `${left.value}px`
              }
            },
            [slots.default!()]
          )
        ]
      );
  }
});
