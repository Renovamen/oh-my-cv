<template>
  <header class="hstack justify-between pl-4 pr-1">
    <nuxt-link
      class="hstack space-x-2 cursor-pointer text-gray-900 dark:text-gray-100"
      :to="$nuxt.$localePath('/')"
    >
      <SharedLogo hide-on-mobile text-base />
      <div text-lg><SharedBrandName /></div>
    </nuxt-link>

    <UiMenubar class="bg-transparent border-none h-auto p-0 gap-0">
      <nuxt-link
        class="hstack cursor-pointer space-x-1 mr-3"
        :to="$nuxt.$localePath('/dashboard')"
      >
        <span class="i-ep:menu text-lg" />
        <span class="hide-on-mobile">
          {{ $t("dashboard.my_resumes") }}
        </span>
      </nuxt-link>

      <UiMenubarMenu>
        <UiMenubarTrigger
          class="space-x-1 mr-1.5 text-base font-normal p-0 focus:(bg-transparent text-inherit) data-[state=open]:(bg-transparent text-inherit)"
        >
          <span class="i-ic:round-translate text-lg" />
          <span class="hide-on-mobile">
            {{ localeName }}
          </span>
        </UiMenubarTrigger>
        <UiMenubarContent class="min-w-28" :side-offset="4">
          <UiMenubarItem
            v-for="item in availableLocales"
            :key="item.code"
            :as="NuxtLink"
            :to="switchLocalePath(item.code)"
          >
            <span v-if="item.icon" :class="[item.icon, 'text-base mr-1.5']" />
            {{ item.name }}
          </UiMenubarItem>
        </UiMenubarContent>
      </UiMenubarMenu>

      <slot name="tail" />

      <SharedToggleDark />

      <UiButton
        as="a"
        variant="ghost-secondary"
        size="round"
        href="http://github.com/Renovamen/oh-my-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github size-4.5 />
      </UiButton>
    </UiMenubar>
  </header>
</template>

<script lang="ts" setup>
import { NuxtLink } from "#components";

const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
);

const localeName = computed(
  () => locales.value.find((i) => i.code === locale.value)?.name || ""
);
</script>
