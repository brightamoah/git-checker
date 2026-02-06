<script setup lang="ts">
const { profile } = defineProps<{
  profile: GitHubProfile;
}>();
</script>

<template>
  <div class="gap-8 grid grid-cols-1 lg:grid-cols-4">
    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      <UCard>
        <div class="space-y-4 text-center">
          <img
            :src="profile.user.avatarUrl"
            :alt="profile.user.login"
            class="mx-auto rounded-full w-32 h-32"
          >

          <div>
            <h2 class="font-bold text-xl">
              {{ profile.user.name || profile.user.login }}
            </h2>

            <p class="text-gray-600 dark:text-gray-400">
              @{{ profile.user.login }}
            </p>
          </div>

          <p
            v-if="profile.user.bio"
            class="text-sm"
          >
            {{ profile.user.bio }}
          </p>

          <div class="flex justify-center gap-4 text-sm">
            <div>
              <span class="font-bold">{{ profile.stats.followers }}</span>

              <span class="text-gray-600 dark:text-gray-400"> followers</span>
            </div>

            <div>
              <span class="font-bold">{{ profile.stats.following }}</span>

              <span class="text-gray-600 dark:text-gray-400"> following</span>
            </div>
          </div>

          <UButton
            :to="`https://github.com/${profile.user.login}`"
            target="_blank"
            block
          >
            View on GitHub
          </UButton>
        </div>
      </UCard>
    </aside>

    <!-- Main Content -->
    <div class="space-y-6 lg:col-span-3">
      <!-- Stats -->
      <div class="gap-4 grid grid-cols-2 md:grid-cols-4">
        <UCard>
          <div class="text-center">
            <div class="font-bold text-2xl">
              {{ profile.stats.totalRepos }}
            </div>

            <div class="text-gray-600 dark:text-gray-400 text-sm">
              Repositories
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="text-center">
            <div class="font-bold text-2xl">
              {{ profile.stats.totalStars }}
            </div>

            <div class="text-gray-600 dark:text-gray-400 text-sm">
              Stars
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="text-center">
            <div class="font-bold text-2xl">
              {{ profile.stats.totalForks }}
            </div>

            <div class="text-gray-600 dark:text-gray-400 text-sm">
              Forks
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="text-center">
            <div class="font-bold text-2xl">
              {{ profile.stats.yearsActive }}
            </div>

            <div class="text-gray-600 dark:text-gray-400 text-sm">
              Years Active
            </div>
          </div>
        </UCard>
      </div>

      <!-- Pinned Repositories -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-lg">
            Pinned Repositories
          </h3>
        </template>

        <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
          <UCard
            v-for="repo in profile.pinnedRepositories"
            :key="repo.name"
            :ui="{ body: 'p-4' }"
          >
            <h4 class="mb-2 font-semibold">
              <a
                :href="repo.url"
                target="_blank"
                class="hover:underline"
              >
                {{ repo.name }}
              </a>
            </h4>

            <p class="mb-3 text-gray-600 dark:text-gray-400 text-sm">
              {{ repo.description || 'No description' }}
            </p>

            <div class="flex items-center gap-4 text-sm">
              <span
                v-if="repo.primaryLanguage"
                class="flex items-center gap-1"
              >
                <span
                  class="rounded-full w-3 h-3"
                  :style="{ backgroundColor: repo.primaryLanguage.color }"
                />
                {{ repo.primaryLanguage.name }}
              </span>

              <span>⭐ {{ repo.stargazerCount }}</span>

              <span>🍴 {{ repo.forkCount }}</span>
            </div>
          </UCard>
        </div>
      </UCard>

      <!-- Language Stats -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-lg">
            Top Languages
          </h3>
        </template>

        <div class="space-y-3">
          <div
            v-for="lang in profile.languages.slice(0, 5)"
            :key="lang.name"
            class="space-y-1"
          >
            <div class="flex justify-between text-sm">
              <span class="flex items-center gap-2">
                <span
                  class="rounded-full w-3 h-3"
                  :style="{ backgroundColor: lang.color }"
                />
                {{ lang.name }}
              </span>

              <span>{{ lang.percentage.toFixed(1) }}%</span>
            </div>

            <UProgress
              :value="lang.percentage"
              :color="lang.color"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
