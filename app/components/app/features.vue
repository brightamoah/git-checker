<script setup lang="ts">
const features = ref([
  {
    title: "Instant Generation",
    description: "Generate a stunning portfolio in seconds by simply entering a GitHub username. No sign-up or configuration required.",
    icon: "i-lucide-zap",
  },
  {
    title: "Customizable Themes",
    description: "Choose from a variety of themes to personalize your portfolio and make it uniquely yours.",
    icon: "i-lucide-palette",
  },
  {
    title: "Export & Share",
    description: "Easily export your portfolio as a static site or share it directly on social media to showcase your GitHub achievements.",
    icon: "i-lucide-share-2",
  },
]);
</script>

<template>
  <section class="z-10 relative mx-auto pb-24 max-w-7xl animate-fade-in-delay-2">
    <UPageGrid>
      <UPageCard
        v-for="item in features"
        :key="item.title"
        v-bind="item"
        spotlight
        :ui="{
          leadingIcon: 'size-8 shrink-0 text-primary',
          title: 'text-xl',
        }"
      />
    </UPageGrid>
  </section>
</template>

<style scoped>

</style>
