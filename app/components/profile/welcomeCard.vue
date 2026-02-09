<script lang="ts" setup>
const { profile } = defineProps<{
  profile: GitHubProfile;
}>();
</script>

<template>
  <UCard>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="font-semibold text-default text-xl">
          Welcome to {{ profile.user.name || profile.user.login }}'s Hub
        </h2>

        <p class="mt-1 text-muted text-sm">
          Explore their open source contributions and projects
        </p>
      </div>

      <div class="text-muted text-sm text-right">
        Powered by <span class="font-semibold text-primary">Git Checker</span>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
