<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Home",
    to: { name: "index" },
  },
];
</script>

<template>
  <UFooter class="bg-default border-t-muted animate-fade-in-delay-3">
    <template #left>
      <p class="text-muted text-sm">
        Developed by Bright Amoah, Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UButton
        icon="i-lucide-linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/in/bright-kweku-amoah-59767a249"
        target="_blank"
        aria-label="LinkedIn"
      />

      <UButton
        icon="i-lucide-mail"
        color="neutral"
        variant="ghost"
        to="mailto:bkamoah02@gmail.com"
        aria-label="Email"
      />

      <UButton
        icon="i-lucide-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/brightamoah/git-checker"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
