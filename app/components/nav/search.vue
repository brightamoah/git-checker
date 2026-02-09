<script lang="ts" setup>
const { navigateToProfile, targetUsername, isLoading } = useNavigationState();

function onEnter() {
  if (targetUsername.value.trim() === "") return;
  navigateToProfile(targetUsername.value);
}
</script>

<template>
  <UInput
    v-model="targetUsername"
    icon="i-lucide-search"
    placeholder="Enter GitHub username..."
    size="xl"
    class="flex-1 mx-auto max-w-sm"
    :ui="{
      base: 'rounded-lg',
    }"
    :disabled="isLoading"
    @keydown.enter="onEnter"
  />
</template>

<style scoped>

</style>
