<template>
  <div class="landing-page">
    <Header />

    <div class="workspace">
      <div
        class="h-fit max-w-240 sm:(absolute inset-0 m-auto)"
        p="x-5 t-40 md:x-20 lt-sm:b-10"
      >
        <div text-center>
          <h1 text="c 3xl sm:4xl" v-html="$t('landing.hero')" />
          <div my-10 text-light-c sm:text-lg><BrandName /> {{ $t("landing.desc") }}</div>
          <nuxt-link :to="$nuxt.$localePath('/resumes')">
            <span
              class="text-white bg-brand rounded-lg mx-auto duration-200"
              p="x-4 y-3"
              outline="~ 4 transparent hover:rose-300/50"
            >
              {{ $t("landing.start") }}
            </span>
          </nuxt-link>
        </div>

        <div m="t-15 x-auto" grid="~ cols-1 sm:cols-2 gap-y-10" text-light-c max-w-150>
          <div v-for="i in [0, 1]" :key="i">
            <div w-fit sm:mx-auto>
              <div hstack mb-3 space-x-1.5>
                <span
                  class="circle size-5 text-white text-xs"
                  :class="i ? 'bg-blue-400' : 'bg-brand'"
                >
                  <span v-if="i" i-wpf:privacy />
                  <span v-else i-mdi:rocket-launch />
                </span>
                <h2 text-c>{{ $t(`landing.feats[${i}].title`) }}</h2>
              </div>
              <ul text-sm pl-2 ml-4.5 list-disc>
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
  </div>
</template>
