<script setup lang="ts">
import { en_gb } from "@nuxt/ui/locale";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");

provide("isMobile", isMobile);

const appLocale = useState("appLocale", () => en_gb);
</script>

<template>
  <UApp
    :toaster="{ position: 'bottom-right', duration: 5000 }"
    :locale="appLocale"
  >
    <NuxtRouteAnnouncer />

    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="2"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
