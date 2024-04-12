<template>
  <div class="landing-page">
    <Header />

    <div class="workspace">
      <div
        class="px-5 md:px-20 pt-40 h-fit max-w-240 lt-sm:pb-10 sm:(absolute inset-0 m-auto)"
      >
        <div text-center>
          <h1 text="c 3xl sm:4xl" v-html="$t('landing.hero')" />
          <div my-10 text-light-c sm:text-lg><BrandName /> {{ $t("landing.desc") }}</div>
          <nuxt-link :to="$nuxt.$localePath('/resumes')">
            <span
              class="text-white bg-brand px-4 py-3 rounded-lg mx-auto outline outline-4 outline-transparent duration-200 hover:outline-rose-300/50"
            >
              {{ $t("landing.start") }}
            </span>
          </nuxt-link>
        </div>

        <div
          class="text-light-c mt-15 mx-auto lt-sm:space-y-10 sm:(w-150 grid grid-cols-2)"
        >
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
