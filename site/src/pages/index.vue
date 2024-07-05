<template>
  <div id="landing-page">
    <SharedHeader />

    <div
      class="h-fit max-w-240 sm:(absolute inset-0 m-auto)"
      p="x-5 t-30 md:x-20 lt-sm:b-10"
    >
      <div text-center>
        <h1 text="3xl sm:4xl" v-html="$t('landing.hero')" />
        <div my-10 text="lg sm:xl"><SharedBrandName /> {{ $t("landing.desc") }}</div>

        <UiButton
          :as="NuxtLink"
          :to="$nuxt.$localePath('/dashboard')"
          class="text-base h-11"
        >
          {{ $t("landing.start") }}
        </UiButton>
      </div>

      <div m="t-15 x-auto" grid="~ cols-1 sm:cols-2 gap-y-10" max-w-150>
        <div v-for="i in [0, 1]" :key="i">
          <div w-fit sm:mx-auto>
            <div hstack mb-3 gap-x-1.5>
              <span
                :class="[
                  'rounded-full flex-center size-5',
                  i ? 'bg-blue-400' : 'bg-primary'
                ]"
                text="white xs"
              >
                <span :class="i ? 'i-wpf:privacy' : 'i-mdi:rocket-launch'" />
              </span>
              <h2 text-foreground>{{ $t(`landing.feats[${i}].title`) }}</h2>
            </div>

            <ul text="sm muted-foreground" pl-2 ml-4.5 list-disc>
              <li
                v-for="line in $t(`landing.feats[${i}].items`).split('<br>')"
                :key="line"
                v-html="line"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
</script>
