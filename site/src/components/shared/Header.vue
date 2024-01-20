<template>
  <header class="header hstack justify-between pl-4 pr-1 text-c">
    <nuxt-link
      class="hstack space-x-2 cursor-pointer text-gray-900 dark:text-gray-100"
      :to="switchPath('/', $i18n.locale)"
    >
      <Logo hide-on-mobile text="sm md:base" />
      <h1 text="base md:lg"><BrandName /></h1>
    </nuxt-link>

    <slot name="middle" />

    <div hstack>
      <NavItem mr-3 link="resumes" :label="$t('resumes.my_resumes')" icon="i-ep:menu" />
      <ToggleLang mr-1.5 />

      <slot name="tail" />

      <ToggleDark />
      <a
        class="round-btn"
        href="http://github.com/Renovamen/oh-my-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github md:text-lg />
      </a>
    </div>
  </header>
</template>
