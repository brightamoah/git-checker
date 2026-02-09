<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const links = ref<ButtonProps[]>([
  {
    label: "Get started",
    color: "neutral",
    class: "cursor-pointer",
    size: "xl",
    onClick: () => document.querySelector("input")?.focus(),
  },
  {
    label: "Star on GitHub",
    color: "neutral",
    variant: "subtle",
    leadingIcon: "i-simple-icons-github",
    class: "cursor-pointer",
    size: "xl",
    to: "https://github.com/brightamoah/git-checker",
    target: "_blank",
  },
]);
</script>

<template>
  <UPageCTA
    title="Ready to stand out?"
    description="Transform your GitHub profile into a stunning portfolio and showcase your projects like never before. Get started now and let your work shine!"
    :links="links"
    variant="outline"
    class="mx-auto mb-2 animate-fade-in-delay-3"
    :ui="{
      description: 'max-w-4xl mx-auto',
      title: 'font-newsreader font-bold tracking-tight',
    }"
  />
</template>
