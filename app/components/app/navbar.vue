<script setup lang="ts">
const { showControls } = useNavigationState();
</script>

<template>
  <header class="top-0 z-50 sticky bg-transparent shadow backdrop-blur-sm mx-auto mt-4 border-default border-b rounded-full w-full">
    <div class="flex justify-between items-center gap-4 mx-auto px-4 sm:px-6 lg:px-8 w-full h-14">
      <AppLogo />

      <section class="flex gap-4 mx-auto w-full max-w-lg">
        <NavSearch v-if="!showControls" />

        <NavControls v-else />
      </section>

      <NavActions :show-controls />
    </div>
  </header>
</template>

<style scoped>

</style>
