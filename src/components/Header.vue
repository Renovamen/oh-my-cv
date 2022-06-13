<template>
  <header
    class="header relative flex justify-between dark:bg-dark-400 pl-4 pr-1.5"
    border="b gray-300 dark:gray-600"
  >
    <OhCV text="lg pc:xl dark:gray-100" />

    <div class="hstack space-x-1.5 text-gray-600 dark:text-gray-300">
      <Toolbar />
      <ToggleLang />
      <ToggleDark />
      <File />
      <a
        class="btn w-7 pc:w-8 text-white bg-gray-500 hover:bg-gray-600"
        href="http://github.com/Renovamen/oh-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span class="iconify" text="sm pc:lg" data-icon="tabler:brand-github" />
      </a>
    </div>
  </header>
</template>
