<template>
  <header
    class="header relative flex justify-between dark:bg-dark-400 px-4 border border-c"
  >
    <OhCV text="lg pc:xl dark:gray-100" />

    <div class="hstack space-x-3 text-gray-600 dark:text-gray-300">
      <ToggleLang />
      <File />
      <ToggleDark />
      <a
        class="nav-item"
        href="http://github.com/Renovamen/oh-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span class="iconify pc:text-lg" data-icon="tabler:brand-github" />
      </a>
    </div>
  </header>
</template>
