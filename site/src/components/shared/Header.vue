<template>
  <header class="header hstack justify-between pl-4 pr-1 text-c">
    <router-link
      class="hstack cursor-pointer text-gray-900 dark:text-gray-100"
      to="/"
    >
      <Logo hide-on-mobile mr-2 text="sm md:base" />
      <h1 font="logo" text="base md:lg">Oh, CV!</h1>
    </router-link>

    <slot name="middle" />

    <div hstack>
      <ToggleLang mr-1.5 md:w-26 />

      <slot name="tail" />

      <ToggleDark />
      <a
        class="round-btn"
        href="http://github.com/Renovamen/oh-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span class="iconify md:text-lg" data-icon="tabler:brand-github" />
      </a>
    </div>
  </header>
</template>
