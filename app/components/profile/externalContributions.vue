<script setup lang="ts">
const { contributions } = defineProps<{
  contributions: ExternalContribution[];
  totalPRs: number;
  totalCommits: number;

}>();

const topContributions = computed(() => contributions.slice(0, 4));
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <ProfileTitle
      title="Open Source Contributions"
      icon="i-lucide-globe"
    />

    <div class="flex items-center gap-3 text-dimmed text-xs">
      <UButton
        variant="link"
        color="success"
        size="xs"
        class="flex items-center gap-1 whitespace-nowrap shrink-0"
        leading-icon="i-lucide-git-pull-request"
        :label="`${formatNumber(totalPRs)} PRs`"
        :ui="{
          label: 'text-dimmed text-sm',
          leadingIcon: 'size-5',
        }"
      />

      <UButton
        variant="link"
        color="neutral"
        size="xs"
        class="gap-1"
        leading-icon="i-lucide-git-commit-horizontal"
        :label="`${formatNumber(totalCommits)} Commits`"
        :ui="{
          label: 'text-dimmed text-sm',
          leadingIcon: 'text-purple-500 size-6.5',
        }"
      />
    </div>
  </div>

  <div class="gap-4 grid sm:grid-cols-2">
    <ULink
      v-for="contribution in topContributions"
      :key="contribution.repoName"
      :to="`https://github.com/${contribution.repoName}`"
      target="_blank"
      rel="noopener noreferrer"
      class="group block bg-default hover:bg-muted p-4 border border-default hover:border-muted rounded-md transition-all"
    >
      <div class="flex justify-between items-start mb-2">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-book-marked"
            class="size-5 text-dimmed"
          />

          <h3 class="font-semibold text-success group-hover:underline">
            {{ contribution.repoName.split('/')[1] }}
          </h3>
        </div>

        <UBadge
          v-if="contribution.language"
          size="xs"
          color="neutral"
          variant="soft"
          class="px-3 py-0.5 rounded-full text-sm"
          :style="{
            backgroundColor: `${LANGUAGE_COLORS[contribution.language?.name!]}20`,
            color: LANGUAGE_COLORS[contribution.language?.name!],
            borderColor: `${LANGUAGE_COLORS[contribution.language?.name!]}40`,
            borderWidth: '0px',
            borderStyle: 'solid',
          }"
        >
          {{ contribution?.language?.name }}
        </UBadge>
      </div>

      <p class="mb-3 text-muted text-base">
        Contributed to <span class="font-semibold text-highlighted">{{ contribution.owner }}</span>
      </p>

      <div class="flex items-center gap-4 text-dimmed text-sm">
        <div
          v-if="contribution.prCount > 0"
          class="flex items-center gap-1"
        >
          <UIcon
            name="i-lucide-git-pull-request"
            class="size-4 text-purple-500"
          />

          <span>{{ contribution.prCount }}</span>
        </div>

        <div
          v-if="contribution.commitCount > 0"
          class="flex items-center gap-1"
        >
          <UIcon
            name="i-lucide-git-commit-horizontal"
            class="size-6.5 text-purple-500"
          />

          <span>{{ contribution.commitCount }}</span>
        </div>

        <div
          v-if="contribution.stargazerCount > 0"
          class="flex items-center gap-1"
        >
          <UIcon
            name="i-heroicons-star-solid"
            class="size-4 text-yellow-500"
          />

          <span>{{ formatNumber(contribution.stargazerCount) }}</span>
        </div>

        <UIcon
          name="i-heroicons-arrow-top-right-on-square-20-solid"
          class="opacity-0 group-hover:opacity-100 ml-auto size-5 transition-opacity"
        />
      </div>
    </ULink>
  </div>
</template>

<style scoped>

</style>
