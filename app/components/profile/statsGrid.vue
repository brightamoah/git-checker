<script setup lang="ts">
const { profile, showStarsFilter = true } = defineProps<{
  profile: GitHubProfile;
  showStarsFilter?: boolean;
}>();

const repoType = ref<"all" | "original">("all");

const displayStars = computed(() => repoType.value === "original"
  ? profile?.stats.originalStars
  : profile?.stats.totalStars);

const starsLabel = computed(() => repoType.value === "original"
  ? "Own Stars"
  : "All Stars");

const staticStats = computed(() => [
  {
    id: "repos",
    description: "Total Repos",
    value: profile?.stats.totalRepos,
    icon: "i-lucide-folder-open",
  },
  {
    id: "stars",
    description: starsLabel.value,
    value: displayStars.value,
    icon: "i-lucide-star",
    interactive: true,
  },
  {
    id: "followers",
    description: "Followers",
    value: profile?.stats.followers,
    icon: "i-lucide-users",
  },
  {
    id: "yearsActive",
    description: "Years Active",
    value: profile?.stats.yearsActive,
    icon: "i-lucide-calendar-days",
  },
]);

function toggleStarsType() {
  repoType.value = repoType.value === "original" ? "all" : "original";
}
</script>

<template>
  <UPageGrid class="gap-4 grid grid-cols-2 lg:grid-cols-4">
    <UCard
      v-for="stat in staticStats"
      :key="stat.id"
    >
      <div class="flex flex-col items-center text-center">
        <UIcon
          :name="stat.icon"
          class="mb-2 size-7 text-muted"
        />

        <div class="font-bold text-highlighted text-3xl">
          {{ formatNumber(stat.value ?? 0) }}
        </div>

        <UButton
          v-if="stat.interactive && showStarsFilter"
          variant="link"
          color="neutral"
          class="group flex items-center gap-1 p-0 text-muted hover:text-highlighted text-sm uppercase tracking-wider transition-colors cursor-pointer"
          title="Click to toggle between own and all stars"
          @click="toggleStarsType"
        >
          {{ starsLabel }}
          <UIcon
            name="i-heroicons-arrows-up-down"
            class="opacity-50 group-hover:opacity-100 size-3 transition-opacity"
          />
        </UButton>

        <div
          v-else
          class="text-muted text-sm uppercase tracking-wider"
        >
          {{ stat.id === 'stars' && !showStarsFilter ? 'Total Stars' : stat.description }}
        </div>
      </div>
    </UCard>
  </UPageGrid>
</template>

<style scoped>

</style>
