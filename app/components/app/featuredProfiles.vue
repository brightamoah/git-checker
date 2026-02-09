<script lang="ts" setup>
const featuredProfiles = [
  { username: "torvalds", name: "Linus Torvalds", role: "Creator of Linux & Git" },
  { username: "yyx990803", name: "Evan You", role: "Creator of Vue.js" },
  { username: "brightamoah", name: "Bright Amoah", role: "Full Stack Developer" },
];

async function handleProfileClick(username: string) {
  const navigationState = useNavigationState();
  await navigationState.navigateToProfile(username);
}
</script>

<template>
  <UPageSection
    id="featured-profiles"
    title="Discover Inspiring GitHub Profiles"
    description="Explore a curated list of influential GitHub users who are making a significant impact in the open-source community."
    class="animate-fade-in-delay-2"
    :ui="{
      title: 'font-newsreader animate-fade-in-up capitalize text-2xl md:text-3xl lg:text-4xl',
      description: 'animate-fade-in-up animation-delay-600 md:-mt-0.5',
    }"
  >
    <template #headline>
      <div class="text-center animate-fade-in-delay-3">
        <UBadge
          variant="subtle"
          class="justify-center items-center"
        >
          Featured Profiles
        </UBadge>
      </div>
    </template>

    <UPageGrid>
      <UPageCard
        v-for="item in featuredProfiles"
        :key="item.username"
        :description="item.role"
        spotlight
        class="cursor-pointer"
        :ui="{
          description: 'text-lg',
        }"
        @click="handleProfileClick(item.username)"
      >
        <template #header>
          <UUser
            :name="item.name"
            :description="`@${item.username}`"
            size="2xl"
            :avatar="{
              src: `https://github.com/${item.username}.png`,
            }"
          />
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<style scoped>

</style>
