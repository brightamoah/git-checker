<script setup lang="ts">
interface Props {
  profile: GitHubProfile;
  views?: number;
  class?: string;
}

const {
  profile,
  views = 0,
  class: customClass = "",
} = defineProps<Props>();

// const totalContributions = computed(() => getTotalContributions(profile));
const streak = computed(() => getContributionStreak(profile));
const activeDay = computed(() => getMostActiveDay(profile));

// Top 3 languages for the chart
const topLanguages = computed(() => profile.languages.slice(0, 3));
const langTotal = computed(() => topLanguages.value.reduce((sum, l) => sum + l.size, 0));

const sortBy = inject(sortByKey) as Ref<"stars" | "pinned">;
const sortOptions = inject(sortOptionsKey) as Ref<{ label: string; value: "stars" | "pinned" }[]>;
const sortedRepos = inject(sortedReposKey) as ComputedRef<GitHubRepository[]>;

const repoStats = computed(() => [
  {
    label: "Repositories" as const,
    value: profile.stats.totalRepos,
  },
  {
    label: "Total Stars" as const,
    value: profile.stats.totalStars,
  },
  { label: "Followers" as const, value: profile.stats.followers },
  { label: "Years Active" as const, value: profile.stats.yearsActive },
]);
</script>

<template>
  <div
    class="mx-auto px-4 sm:px-6 lg:px-8 py-8"
    :class="customClass"
  >
    <!-- Bento Grid -->
    <div class="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
      <!-- Profile Card (2x2) -->
      <UCard
        variant="subtle"
        class="md:col-span-2 md:row-span-2 bg-default"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-4">
            <NuxtImg
              :src="profile.user.avatarUrl"
              :alt="profile.user.login"
              class="bg-primary-50 border-2 border-default rounded-full size-25"
            />

            <div class="flex-1">
              <h1 class="font-bold text-highlighted text-3xl">
                {{ profile.user.name || profile.user.login }}
              </h1>

              <p class="font-medium text-dimmed text-base">
                @{{ profile.user.login }}
              </p>
            </div>
          </div>

          <p
            v-if="profile.user.bio"
            class="flex-1 mt-4 font-medium text-muted text-base"
          >
            {{ profile.user.bio }}
          </p>

          <div class="flex flex-wrap gap-2 mt-4">
            <UBadge
              v-for="lang in profile.languages.slice(0, 5)"
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

          <div class="flex items-center gap-4 mt-4 text-dimmed text-sm">
            <span
              v-if="profile.user.location"
              class="flex items-center gap-1"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="size-5"
              />
              {{ profile.user.location }}
            </span>

            <span v-if="profile.user.company">
              {{ profile.user.company.replace('@', '') }}
            </span>

            <div class="flex items-center gap-1">
              <UIcon
                name="i-lucide-eye"
                class="w-4 h-4"
              />

              <span class="font-semibold text-highlighted">{{ views }}</span>
            </div>
          </div>
        </div>
      </UCard>

      <UCard
        v-for="stat in repoStats"
        :key="stat.label"
        variant="subtle"
        class="bg-default"
      >
        <div class="flex flex-col justify-center items-center h-full text-center">
          <div
            class="font-bold text-highlighted text-4xl"
            :class="[
              stat.label === 'Total Stars' ? 'text-yellow-600' : '',
              stat.label === 'Followers' ? 'text-success-500' : '',
              stat.label === 'Years Active' ? 'text-purple-500' : '',
            ]"
          >
            {{ formatNumber(stat.value) }}
          </div>

          <div class="mt-1 font-medium text-muted text-sm uppercase tracking-wider">
            {{ stat.label }}
          </div>
        </div>
      </UCard>

      <!-- Language Chart (2 cols) -->

      <UCard
        variant="subtle"
        class="md:col-span-2 bg-default"
      >
        <h3 class="mb-4 font-semibold text-muted text-base">
          Top Languages
        </h3>

        <div class="flex items-center gap-6">
          <!-- Mini donut -->
          <svg
            width="120"
            height="120"
            class="-rotate-90 shrink-0"
          >
            <circle
              v-for="(lang, i) in topLanguages"
              :key="lang.name"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              :stroke="lang.color"
              stroke-width="16"
              :stroke-dasharray="`${(lang.size / langTotal) * 314.2} 314.2`"
              :stroke-dashoffset="`${-topLanguages.slice(0, i).reduce((sum, l) => sum + (l.size / langTotal) * 100, 0) * 3.142}`"
            />
          </svg>

          <div class="flex-1 space-y-2">
            <div
              v-for="lang in topLanguages"
              :key="lang.name"
              class="flex justify-between items-center text-sm"
            >
              <div class="flex items-center gap-2">
                <div
                  class="rounded-full size-3.5"
                  :style="{ backgroundColor: lang.color }"
                />

                <span class="font-medium text-highlighted text-base">{{ lang.name }}</span>
              </div>

              <span class="font-medium text-muted text-base">{{ lang.percentage }}%</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Productivity Insights (2 cols) -->
      <UCard
        variant="subtle"
        class="md:col-span-2 bg-default"
      >
        <h3 class="mb-4 font-semibold text-muted text-base">
          Productivity Insights
        </h3>

        <div class="gap-4 grid grid-cols-2">
          <!-- Streak -->
          <div class="flex flex-col gap-1 bg-muted p-4 rounded-xl">
            <div class="flex items-center gap-2 text-orange-500">
              <UIcon
                name="i-lucide-flame"
                class="size-5.5"
              />

              <span class="font-semibold text-sm uppercase tracking-wider">Current Streak</span>
            </div>

            <div class="mt-2 font-bold text-highlighted text-3xl">
              {{ streak }} <span class="font-normal text-muted text-base">days</span>
            </div>
          </div>

          <!-- Most Active -->
          <div class="flex flex-col gap-1 bg-muted p-4 rounded-xl">
            <div class="flex items-center gap-2 text-green-500">
              <UIcon
                name="i-heroicons-chart-bar"
                class="size-5.5"
              />

              <span class="font-semibold text-sm uppercase tracking-wider">Top Day</span>
            </div>

            <div
              v-if="activeDay"
              class="mt-2 font-bold text-highlighted text-3xl"
            >
              {{ new Date(activeDay.date).toLocaleDateString('en-US', { weekday: 'short' }) }}
              <span class="font-normal text-muted text-base">
                ({{ activeDay.contributionCount }})
              </span>
            </div>

            <div
              v-else
              class="mt-2 text-muted text-base"
            >
              No data
            </div>
          </div>
        </div>
      </UCard>

      <!-- Contributions (full width) -->
      <div
        v-if="profile.contributions"
        class="md:col-span-2 lg:col-span-4"
      >
        <ProfileContributions :profile />
      </div>

      <!-- External Open Source Contributions (full width) -->
      <div
        v-if="profile.contributions?.externalContributions && profile.contributions.externalContributions.length > 0"
        class="md:col-span-2 lg:col-span-4"
      >
        <ProfileExternalContributions
          :contributions="profile.contributions.externalContributions"
          :total-p-rs="profile.contributions.externalPRCount ?? 0"
          :total-commits="profile.contributions.externalCommitCount ?? 0"
        />
      </div>

      <!-- Projects (full width) -->
      <div
        v-if="profile.pinnedRepositories.length > 0"
        class="md:col-span-2 lg:col-span-4"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="flex items-center gap-2 font-semibold text-highlighted text-lg">
            <UIcon
              name="i-lucide-bookmark"
              class="size-5.5 text-muted"
            />
            Pinned Projects
          </h3>

          <ProfileDropdown
            v-model="sortBy"
            :sort-options
            class="w-30"
          />
        </div>

        <div class="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
          <ProfileProjectCard
            v-for="repo in sortedRepos.slice(0, 6)"
            :key="repo.name"
            :repo="repo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
