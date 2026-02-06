<script setup lang="ts">
const state = ref<GetProfileSchema>({
  username: "",
});

const router = useRouter();
const isLoading = ref(false);

function handleSearch() {
  if (state.value.username.trim()) {
    isLoading.value = true;
    router.push(`/${state.value.username.trim()}?template=github`);
  }
}
</script>

<template>
  <main class="relative w-full min-h-screen overflow-hidden">
    <AppBg class="-z-10 absolute inset-0 opacity-15 w-full h-full pointer-events-none" />

    <AppHero
      :state
      :search="handleSearch"
      :is-loading="isLoading"
    />
  </main>
</template>

<style scoped>

</style>
