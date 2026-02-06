<script lang="ts" setup>
const { username = "" } = defineProps<{
  username?: string;
}>();

const router = useRouter();
const searchValue = ref("");
const isLoading = ref(false);
const isSearchFocused = ref(false);

watch(() => username, (newUsername) => {
  if (newUsername) searchValue.value = newUsername;
}, { immediate: true });

function handleSearch(event: KeyboardEvent) {
  if (event.key === "Enter" && searchValue.value.trim()) {
    isLoading.value = true;
    router.push(`/${searchValue.value.trim()}?template=github`);
  }
}
</script>

<template>
  <UInput
    v-model="searchValue"
    icon="i-lucide-search"
    placeholder="Enter GitHub username..."
    size="xl"
    class="flex-1 mx-auto max-w-sm"
    :ui="{
      base: 'rounded-lg',
    }"
    :disabled="isLoading"
    @blur="() => isSearchFocused = false"
    @focus="() => isSearchFocused = true"
    @keydown="handleSearch"
  />
</template>

<style scoped>

</style>
