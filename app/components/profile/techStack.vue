<script setup lang="ts">
const profile = inject(profileKey) as ComputedRef<GitHubProfile>;
</script>

<template>
  <div>
    <ProfileTitle
      title="Tech Stack & Languages"
      icon="i-lucide-code-xml"
      class="mb-4"
    />

    <div class="gap-4 grid md:grid-cols-2">
      <ProfileStack
        :languages="profile?.languages"
        :bio="profile?.user?.bio"
      />

      <ProfileLanguageChart :languages="profile?.languages" />
    </div>
  </div>
</template>

<style scoped>

</style>
