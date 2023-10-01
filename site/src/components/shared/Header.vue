<template>
  <header class="header hstack justify-between pl-4 pr-1 text-c">
    <nuxt-link
      class="hstack cursor-pointer text-gray-900 dark:text-gray-100"
      :to="switchPath('/', locale)"
    >
      <Logo hide-on-mobile mr-2 text="sm md:base" />
      <h1 text="base md:lg"><BrandName /></h1>
    </nuxt-link>

    <slot name="middle" />

    <div hstack>
      <NavItem mr-3 link="resumes" :label="t('resumes.my_resumes')" icon="ep:menu" />
      <ToggleLang mr-1.5 />

      <slot name="tail" />

      <ToggleDark />
      <a
        class="round-btn"
        href="http://github.com/Renovamen/oh-my-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <client-only>
          <span class="iconify md:text-lg" data-icon="tabler:brand-github" />
        </client-only>
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
</script>
