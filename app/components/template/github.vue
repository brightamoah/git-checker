<script setup lang="ts">
interface Props {
  views?: number;
}

const { views } = defineProps<Props>();

const profile = inject(profileKey) as ComputedRef<GitHubProfile>;

const contributions = computed(() => profile?.value?.contributions?.externalContributions ?? []);

const totalPRs = computed(() => profile?.value?.contributions?.externalPRCount ?? 0);

const totalCommits = computed(() => profile?.value?.contributions?.externalCommitCount ?? 0);
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex lg:flex-row flex-col gap-8">
      <div class="lg:top-24 lg:sticky lg:self-start w-full lg:w-74 lg:shrink-0">
        <ProfileSidebar
          :profile
          :views
        />
      </div>

      <div class="flex-1 space-y-6">
        <ProfileWelcomeCard :profile />

        <ProfileStatsGrid :profile />

        <ProfileContributions
          v-if="profile?.contributions"
          :profile
        />

        <ProfileTechStack />

        <ProfileExternalContributions
          v-if="profile.contributions?.externalContributions && profile.contributions.externalContributions.length > 0"
          :contributions
          :total-p-rs
          :total-commits
        />

        <ProfileNotable />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
