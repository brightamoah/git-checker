<script lang="ts" setup>
const sortOptions = [
  { value: "stars" as const, label: "Most Stars" },
  { value: "pinned" as const, label: "Pinned Order" },
];

const sortBy = ref<"stars" | "pinned">("stars");

const profile = inject(profileKey) as ComputedRef<GitHubProfile>;

const sortedRepos = computed(() => sortBy.value === "stars"
  ? [...(profile?.value?.pinnedRepositories ?? [])].sort((a, b) => b.stargazerCount - a.stargazerCount)
  : profile?.value?.pinnedRepositories,
);
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2">
      <svg
        class="w-5 h-5 text-text-tertiary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>

      <h3 class="font-semibold text-text-primary text-lg">
        Notable Projects
      </h3>
    </div>

    <ProfileDropdown
      v-model="sortBy"
      :sort-options
    />
  </div>

  <div class="gap-4 grid sm:grid-cols-2">
    <ProfileProjectCard
      v-for="repo in sortedRepos"
      :key="repo.name"
      :repo
    />
  </div>
</template>

<style scoped>

</style>
