<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

const { profile } = defineProps<{
  profile: GitHubProfile;
}>();

const colorMode = useColorMode();

const calendar = computed(() => profile.contributions?.contributionCalendar);
const totalContributions = computed(() => calendar.value?.totalContributions ?? 0);

const weeks = computed(() => calendar.value?.weeks.slice(-52) ?? []);

// Days of week labels
const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

// Month labels based on weeks
function getMonthLabels(weeks: ContributionWeek[]): { label: string; col: number }[] {
  const months: { label: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        months.push({
          label: date.toLocaleDateString("en-US", { month: "short" }),
          col: index,
        });
        lastMonth = month;
      }
    }
  });

  return months;
}

// Get contribution color based on theme
function getContributionColor(color: string, count: number): string {
  if (count === 0) {
    return colorMode.value === "dark" ? "#161b22" : "#ebedf0";
  }

  // In light mode, use the original colors from GitHub API
  if (colorMode.value === "light") {
    return color;
  }

  // In dark mode, map light colors to dark equivalents
  const darkColorMap: Record<string, string> = {
    "#9be9a8": "#0e4429", // Level 1
    "#40c463": "#006d32", // Level 2
    "#30a14e": "#26a641", // Level 3
    "#216e39": "#39d353", // Level 4
  };

  return darkColorMap[color.toLowerCase()] || color;
}

const monthLabels = computed(() => getMonthLabels(weeks.value));
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <ProfileTitle
      title="Contributions"
      icon="i-heroicons-chart-bar"
    />

    <div class="text-muted text-base">
      <span class="font-semibold text-highlighted">
        {{ formatNumber(totalContributions) }}
      </span>

      <span class="ml-1">in the last year</span>
    </div>
  </div>

  <!-- Heatmap Card -->
  <UCard>
    <div
      v-if="calendar"
      class="w-full"
    >
      <!-- Month labels -->
      <div class="flex mb-2 text-muted text-sm">
        <!-- Spacer for Day Labels -->
        <div class="w-8 shrink-0" />

        <!-- Months Grid -->
        <div class="flex flex-1 justify-between gap-0.5">
          <div
            v-for="(week, i) in weeks"
            :key="`week-${i}`"
            class="relative flex-1 min-w-0"
          >
            <template
              v-for="month in monthLabels"
              :key="`month-${month.col}`"
            >
              <span
                v-if="month.col === i"
                class="bottom-0 left-0 absolute text-xs truncate"
              >
                {{ month.label }}
              </span>
            </template>
          </div>
        </div>
      </div>

      <!-- Graph grid -->
      <div class="flex gap-2 w-full">
        <!-- Day labels -->
        <div class="flex flex-col gap-0.5 w-8 shrink-0">
          <div
            v-for="(label, index) in dayLabels"
            :key="`day-${index}`"
            class="flex flex-1 justify-end items-center text-muted text-xs leading-none"
          >
            <span class="mr-1">{{ label }}</span>
          </div>
        </div>

        <!-- Contribution squares -->
        <div class="flex flex-1 justify-between gap-0.5">
          <div
            v-for="(week, weekIndex) in weeks"
            :key="`contrib-week-${weekIndex}`"
            class="flex flex-col flex-1 gap-1 min-w-0"
          >
            <UTooltip
              v-for="(day, dayIndex) in week.contributionDays"
              :key="`day-${weekIndex}-${dayIndex}`"
              :text="`${day.contributionCount} contributions on ${useDateFormat(new Date(day.date), 'ddd DD/MM/YYYY').value}`"
              :delay-duration="200"
            >
              <div
                class="hover:opacity-80 rounded-sm w-full aspect-square transition-opacity"
                :style="{ backgroundColor: getContributionColor(day.color, day.contributionCount) }"
              />
            </UTooltip>
          </div>
        </div>
      </div>

      <div class="mt-2 -mb-3 text-muted text-sm">
        Last 52 weeks of activity
      </div>
    </div>

    <!-- No data state -->
    <div
      v-else
      class="flex justify-center items-center h-32 text-muted text-sm"
    >
      <div class="text-center">
        <UIcon
          name="i-heroicons-chart-bar"
          class="mx-auto mb-2 w-8 h-8"
        />

        <p>Contribution data not available</p>

        <p class="mt-1 text-xs">
          Sign in with GitHub for full data
        </p>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
