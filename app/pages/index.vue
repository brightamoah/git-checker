<script setup lang="ts">
const state = ref<GetProfileSchema>({
  username: "",
});

const count = ref(1000);

const navigationState = useNavigationState();

const isLoading = computed(() => unref(navigationState.isLoading));

function handleSearch() {
  if (state.value.username.trim()) {
    navigationState.navigateToProfile(state.value.username.trim());
  }
}
</script>

<template>
  <main class="relative w-full min-h-screen overflow-hidden">
    <AppBg class="-z-10 absolute inset-0 opacity-15 w-full h-full pointer-events-none" />

    <AppHero
      :state
      :is-loading
      :count
      :search="handleSearch"
    />

    <AppScreenshot />

    <AppFeatures />

    <AppFeaturedProfiles />

    <AppCallToAction />
  </main>
</template>

<style scoped>

</style>
