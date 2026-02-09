<script setup lang="ts">
const { languages } = defineProps<{
  languages: LanguageStats[];
}>();

const topLanguages = computed(() => languages.slice(0, 5));

const total = computed(() => topLanguages.value.reduce((sum, lang) => sum + lang.size, 0));

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)}MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)}KB`;
  return `${bytes} bytes`;
}

// Calculate cumulative offsets for the donut chart
function calculateSegments(langs: LanguageStats[]) {
  const segments: Array<{ lang: LanguageStats; offset: number; percentage: number }> = [];
  let cumulativeOffset = 0;

  for (const lang of langs) {
    const percentage = (lang.size / total.value) * 100;
    segments.push({
      lang,
      offset: cumulativeOffset,
      percentage,
    });
    cumulativeOffset += percentage;
  }

  return segments;
}

const segments = computed(() => calculateSegments(topLanguages.value));

const size = 120;
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
</script>

<template>
  <UCard
    :ui="{
      body: 'p-2 sm:p-3',
    }"
  >
    <div class="flex items-center gap-6">
      <template v-if="topLanguages.length > 0">
        <div class="relative shrink-0">
          <svg
            :width="size"
            :height="size"
            class="-rotate-90"
          >
            <circle
              v-for="segment in segments"
              :key="segment.lang.name"
              :cx="size / 2"
              :cy="size / 2"
              :r="radius"
              fill="none"
              :stroke="segment.lang.color"
              :stroke-width="strokeWidth"
              :stroke-dasharray="`${(segment.percentage / 100) * circumference} ${circumference}`"
              :stroke-dashoffset="-(segment.offset / 100) * circumference"
              class="transition-all duration-300"
            />
          </svg>

          <div class="absolute inset-0 flex justify-center items-center text-dimmed text-sm">
            {{ topLanguages.length }} langs
          </div>
        </div>

        <div class="flex-1 space-y-2">
          <div
            v-for="language in topLanguages"
            :key="language.name"
            class="flex justify-between items-center text-sm"
          >
            <div class="flex items-center gap-2">
              <div
                class="rounded-full w-3 h-3"
                :style="{ backgroundColor: language.color }"
              />

              <span class="text-text-primary">{{ language.name }}</span>
            </div>

            <span class="text-text-secondary">{{ language.percentage }}%</span>
          </div>
        </div>
      </template>

      <div
        v-else
        class="flex justify-center items-center py-4 w-full text-text-tertiary text-sm"
      >
        No language data available
      </div>
    </div>

    <div
      v-if="topLanguages.length > 0"
      class="mt-4 text-dimmed text-sm"
    >
      Based on {{ formatBytes(total) }} of code
    </div>
  </UCard>
</template>

<style scoped>

</style>
