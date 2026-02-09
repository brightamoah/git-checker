<script lang="ts" setup>
const { repo } = defineProps<{
  repo: GitHubRepository;
}>();
</script>

<template>
  <ULink
    :to="repo.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block bg-default hover:bg-muted p-4 border border-default hover:border-muted rounded-md transition-all"
  >
    <div class="flex justify-between items-start gap-2 mb-2">
      <div class="flex items-center gap-2 min-w-0">
        <UIcon
          name="i-lucide-folder-open"
          class="size-5 text-dimmed"
        />

        <h3 class="font-semibold text-success group-hover:underline truncate">
          {{ repo.name }}
        </h3>
      </div>

      <UBadge
        v-if="repo.primaryLanguage"
        size="xs"
        color="neutral"
        variant="soft"
        class="px-3 py-0.5 rounded-full text-sm"
        :style="{
          backgroundColor: `${LANGUAGE_COLORS[repo.primaryLanguage?.name!]}20`,
          color: LANGUAGE_COLORS[repo.primaryLanguage?.name!],
          borderColor: `${LANGUAGE_COLORS[repo.primaryLanguage?.name!]}40`,
          borderWidth: '0px',
          borderStyle: 'solid',
        }"
      >
        {{ repo.primaryLanguage?.name }}
      </UBadge>
    </div>

    <p
      v-if="repo.description"
      class="mb-3 text-muted text-base line-clamp-2"
    >
      {{ repo.description }}
    </p>

    <p
      v-else
      class="mb-3 text-text-tertiary text-sm italic"
    >
      No description available for this repository.
    </p>

    <div
      v-if="repo.topics && repo.topics.length > 0"
      class="flex flex-wrap gap-1 mb-3"
    >
      <span
        v-for="topic in repo.topics"
        :key="topic"
        class="bg-success/10 px-2 py-0.5 rounded-full text-success text-sm"
      >
        {{ topic }}
      </span>
    </div>

    <div class="flex items-center gap-4 text-dimmed text-sm">
      <div class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-star-solid"
          class="size-4 text-dimmed"
        />

        <span>{{ formatNumber(repo.stargazerCount) }}</span>
      </div>

      <div class="flex items-center gap-1">
        <UIcon
          name="i-lucide-git-fork"
          class="size-4.5 text-dimmed"
        />

        <span>{{ formatNumber(repo.forkCount) }}</span>
      </div>

      <UIcon
        name="i-heroicons-arrow-top-right-on-square-20-solid"
        class="opacity-0 group-hover:opacity-100 ml-auto size-5 transition-opacity"
      />
    </div>
  </ULink>
</template>

<style scoped>

</style>
