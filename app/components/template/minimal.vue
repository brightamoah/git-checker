<script setup lang="ts">
const { views = 0 } = defineProps<{
  views?: number;
}>();

const profile = inject(profileKey) as ComputedRef<GitHubProfile>;

const sortBy = inject(sortByKey) as Ref<"stars" | "pinned">;
const sortOptions = inject(sortOptionsKey) as Ref<{ label: string; value: "stars" | "pinned" }[]>;
const sortedRepos = inject(sortedReposKey) as ComputedRef<GitHubRepository[]>;

const totalContributions = computed(() => getTotalContributions(profile.value));
const joinDate = computed(() => formatJoinDate(profile.value.user.createdAt, "long"));

const stats = computed(() => [
  { label: "Repositories" as const, value: profile.value.stats.totalRepos, highlight: false },
  { label: "Stars" as const, value: profile.value.stats.totalStars, highlight: false },
  { label: "Followers" as const, value: profile.value.stats.followers, highlight: false },
  { label: "Contributions" as const, value: totalContributions.value, highlight: true },
]);
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
    <header class="mb-10 text-center">
      <NuxtImg
        :src="profile.user.avatarUrl"
        :alt="profile.user.login"
        class="bg-primary-50 mx-auto mb-6 border-2 border-default rounded-full size-40"
      />

      <h1 class="font-bold text-default text-4xl">
        {{ profile.user.name || profile.user.login }}
      </h1>

      <p class="mt-2 font-medium text-muted text-xl">
        @{{ profile.user.login }}
      </p>

      <p
        v-if="profile.user.bio"
        class="mt-3 text-dimmed text-lg"
      >
        {{ profile.user.bio }}
      </p>

      <div class="flex flex-wrap justify-center items-center gap-4 mt-4 font-medium text-muted text-base">
        <span v-if="profile.user.location">{{ profile.user.location }}</span>

        <span v-if="profile.user.company">{{ profile.user.company.replace('@', '') }}</span>

        <ULink
          v-if="profile.user.websiteUrl"
          :to="profile.user.websiteUrl.startsWith('http') ? profile.user.websiteUrl : `https://${profile.user.websiteUrl}`"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-success hover:underline"
        >
          {{ profile.user.websiteUrl.replace(/^https?:\/\//, '') }}
        </ULink>
      </div>
    </header>

    <section class="mb-14">
      <div class="flex flex-wrap justify-center items-center gap-8 text-center">
        <template
          v-for="(stat, index) in stats"
          :key="stat.label"
        >
          <div
            v-if="index > 0"
            class="border border-default w-px h-12"
          />

          <div>
            <div
              class="font-bold text-3xl"
              :class="stat.highlight ? 'text-success' : 'text-default'"
            >
              {{ formatNumber(stat.value) }}
            </div>

            <div class="text-muted text-sm">
              {{ stat.label }}
            </div>
          </div>
        </template>
      </div>
    </section>

    <section
      v-f="profile.languages.length > 0"
      class="mb-14"
    >
      <h2 class="mb-4 font-semibold text-muted text-sm text-center uppercase tracking-widest">
        Technologies
      </h2>

      <div class="flex flex-wrap justify-center gap-2">
        <UBadge
          v-for="lang in profile.languages"
          :key="lang.name"
          variant="soft"
          color="neutral"
          size="lg"
          class="rounded-full text-sm"
          :style="{
            backgroundColor: `${LANGUAGE_COLORS[lang.name]}20`,
            color: LANGUAGE_COLORS[lang.name],
            borderColor: `${LANGUAGE_COLORS[lang.name]}40`,
            borderWidth: '1.5px',
            borderStyle: 'solid',
          }"
        >
          {{ lang.name }}
        </UBadge>
      </div>
    </section>

    <section
      v-if="profile.contributions?.externalContributions && profile.contributions.externalContributions.length > 0"
      class="mb-14"
    >
      <ProfileExternalContributions
        :total-p-rs="profile.contributions.externalPRCount ?? 0"
        :total-commits="profile.contributions.externalCommitCount ?? 0"
        :contributions="profile.contributions.externalContributions"
      />
    </section>

    <section class="mb-14">
      <div class="flex justify-between items-center mb-8">
        <h2 class="font-semibold text-muted text-sm uppercase tracking-widest">
          Featured Projects
        </h2>

        <ProfileDropdown
          v-model="sortBy"
          :sort-options
        />
      </div>

      <div class="space-y-6">
        <ULink
          v-for="repo in sortedRepos.slice(0, 4)"
          :key="repo.name"
          :to="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block pb-6 border-muted last:border-0 border-b"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-success text-lg group-hover:underline truncate">
                {{ repo.name }}
              </h3>

              <p
                v-if="repo.description"
                class="mt-1 max-w-137.5 font-medium text-muted text-sm wrap-break-word line-clamp-2"
              >
                {{ repo.description }}
              </p>
            </div>

            <div class="flex items-center gap-3.5 text-dimmed text-base shrink-0">
              <span
                v-if="repo.primaryLanguage"
                class="flex items-center gap-1"
              >
                <span
                  class="rounded-full size-2.5"
                  :style="{ backgroundColor: LANGUAGE_COLORS[repo.primaryLanguage.name] }"
                />
                {{ repo.primaryLanguage.name }}
              </span>

              <span class="flex items-center gap-1">
                <UIcon
                  name="i-heroicons-star-solid"
                  class="size-5 text-muted"
                />
                {{ formatNumber(repo.stargazerCount) }}
              </span>
            </div>
          </div>
        </ULink>
      </div>
    </section>

    <footer class="text-dimmed text-sm text-center">
      <p class="font-medium text-sm">
        {{ joinDate }}
      </p>

      <ULink
        href="https://github.com/{profile.user.login}"
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex items-center gap-1 mt-2 hover:text-success text-base hover:underline"
      >
        View on GitHub <span>
          <UIcon
            name="i-lucide-external-link"
            class="inline-block size-5 text-muted group-hover:text-success"
          />
        </span>
      </ULink>

      <p class="flex justify-center items-center gap-2 mt-4 text-text-secondary">
        <UIcon
          name="i-lucide-eye"
          class="size-5 text-muted group-hover:text-success"
        />

        <span><span class="font-semibold text-text-primary">{{ views.toLocaleString() }}</span> viewers</span>
      </p>
    </footer>
  </div>
</template>

<style scoped>

</style>
