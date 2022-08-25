<template>
  <header
    class="header relative hstack justify-between px-4 border-b border-c bg-c text-c"
  >
    <div hstack cursor-pointer text="gray-900 dark:gray-100">
      <Logo hidden pc:block mr-2 text="sm pc:base" />
      <h1 font="logo" text="base pc:lg">Oh, CV!</h1>
    </div>

    <ResumeOptions />

    <div hstack space-x-2 pc:space-x-3>
      <ToggleLang w-4 pc:w-26 />
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
