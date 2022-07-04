<template>
  <div cursor-pointer @click="toggleDark()">
    <div v-show="isDark" class="w-full h-full flex-center">
      <span class="iconify pc:text-lg" data-icon="ph:moon-bold" />
    </div>
    <div v-show="!isDark" class="w-full h-full flex-center">
      <span class="iconify pc:text-lg" data-icon="ph:sun-bold" />
    </div>
  </div>
</template>
