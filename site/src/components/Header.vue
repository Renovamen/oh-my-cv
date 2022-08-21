<template>
  <header
    class="header relative flex justify-between dark:bg-dark-400 px-4 border-b border-c"
    text="gray-600 dark:gray-300"
  >
    <OhCV text="lg pc:xl black dark:gray-100" />

    <ResumeOptions />

    <div class="hstack space-x-2 pc:space-x-3">
      <ToggleLang w-4 pc:w-26 />
      <SaveResume />
      <ToggleToolbar />
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
