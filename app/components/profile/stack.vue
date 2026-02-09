<script setup lang="ts">
const { languages } = defineProps<{
  bio?: string | null;
  languages: LanguageStats[];
}>();

// const categories = computed(() => {
//   const result: Record<string, LanguageStats[]> = {
//     Languages: [],
//     Frameworks: [],
//     Tools: [],
//   };

//   const frameworkKeywords = ["React", "Vue", "Svelte", "Angular", "Next", "Nuxt", "CSS"];
//   const toolKeywords = ["Docker", "Kubernetes", "Terraform", "Shell"];

//   for (const lang of languages) {
//     if (frameworkKeywords.some(kw => lang.name.includes(kw))) {
//       result.Frameworks?.push(lang);
//     }
//     else if (toolKeywords.some(kw => lang.name.includes(kw))) {
//       result.Tools?.push(lang);
//     }
//     else {
//       result.Languages?.push(lang);
//     }
//   }

//   return result;
// });
</script>

<template>
  <UCard
    :ui="{
      body: 'p-2 sm:p-3',
    }"
  >
    <div
      v-if="bio"
      class="mb-4"
    >
      <p class="text-muted text-base leading-relaxed">
        {{ bio }}
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="font-semibold text-toned text-sm uppercase tracking-wider">
        Core Technologies
      </h3>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="lang in languages.slice(0, 8)"
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
          <template #leading>
            <span
              class="inline-block rounded-full size-2"
              :style="{ backgroundColor: LANGUAGE_COLORS[lang.name] }"
            />
          </template>
          {{ lang.name }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
