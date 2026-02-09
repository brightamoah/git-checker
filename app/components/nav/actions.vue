<script setup lang="ts">
interface ActionProps {
  showControls?: boolean;
  onExport?: () => void;
  onShare?: () => void;
  onQRCode?: () => void;
}

const {
  onExport,
  onQRCode,
  onShare,
  showControls = false,
} = defineProps<ActionProps>();

const config = useRuntimeConfig();

const starCount = ref<number | null>(null);

watchEffect(() => {
  $fetch<{ stargazers_count: number }>(config.public.githubApiUrl)
    .then((data) => {
      if (typeof data.stargazers_count === "number") {
        starCount.value = data.stargazers_count;
      }
    })
    .catch(() => {
      // Silently fail - button will still work without count
    });
});
</script>

<template>
  <section class="flex items-center gap-2">
    <UButton
      icon="i-heroicons-chart-bar"
      variant="ghost"
      class="cursor-pointer"
      :to="{ name: 'rankings' }"
    >
      <span class="hidden sm:inline">Rankings</span>
    </UButton>

    <template v-if="showControls">
      <UButton
        icon="i-lucide-download"
        variant="ghost"
        color="neutral"
        class="cursor-pointer"
        @click="onExport"
      >
        <span class="hidden sm:inline">Export</span>
      </UButton>

      <UButton
        icon="i-lucide-share-2"
        variant="ghost"
        color="neutral"
        class="cursor-pointer"
        @click="onShare"
      >
        <span class="hidden sm:inline">Share</span>
      </UButton>

      <UButton
        icon="i-lucide-qr-code"
        color="neutral"
        variant="ghost"
        class="cursor-pointer"
        @click="onQRCode"
      >
        <span class="hidden sm:inline">QR</span>
      </UButton>
    </template>

    <UColorModeButton class="cursor-pointer" />

    <UButton
      icon="i-heroicons-star-solid"
      variant="soft"
      color="neutral"
      class="cursor-pointer"
      to="https://github.com/brightamoah/git-checker.git"
      target="_blank"
      :ui="{
        leadingIcon: 'text-yellow-400',
      }"
    >
      <span v-if="starCount !== null">
        {{ formatStarCount(starCount) }}
        <span class="hidden md:inline">
          GitHub Star
          <span v-if="starCount > 1">s</span>
        </span>

      </span>

      <span
        v-else
        class="hidden sm:inline"
      >Star on GitHub</span>
    </UButton>
  </section>
</template>

<style scoped>

</style>
