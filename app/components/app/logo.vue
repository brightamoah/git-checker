<script lang="ts" setup>

</script>

<template>
  <NuxtLink
    :to="{ name: 'index' }"
    class="flex items-center gap-2.5 hover:opacity-80 hover:no-underline shrink-0"
  >
    <NuxtImg
      src="/favicon.svg"
      alt="Git Checker Logo"
      class="size-8"
    />

    <span class="hidden sm:inline font-semibold text-highlighted text-xl tracking-tight">Git Checker</span>
  </NuxtLink>
</template>

<style scoped>

</style>
