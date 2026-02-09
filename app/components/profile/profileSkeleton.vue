<script setup lang="ts">
// No imports needed - Nuxt UI components are auto-imported
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex lg:flex-row flex-col gap-8">
      <!-- Sidebar Skeleton -->
      <aside class="flex flex-col items-center lg:items-start gap-4 w-full lg:w-74 lg:text-left text-center lg:shrink-0">
        <!-- Avatar -->
        <USkeleton class="rounded-full w-74 h-74" />

        <!-- Name & Username -->
        <div class="space-y-2 w-full">
          <USkeleton class="mx-auto lg:mx-0 w-45 h-8" />

          <USkeleton class="mx-auto lg:mx-0 w-30 h-6" />
        </div>

        <!-- Bio -->
        <div class="space-y-2 w-full">
          <USkeleton class="w-full h-4" />

          <USkeleton class="w-[85%] h-4" />
        </div>

        <!-- Follow Button -->
        <USkeleton class="w-full h-10" />

        <!-- Tags -->
        <div class="flex flex-wrap justify-center lg:justify-start gap-2">
          <USkeleton class="rounded-full w-20 h-6" />

          <USkeleton class="rounded-full w-22.5 h-6" />

          <USkeleton class="rounded-full w-17.5 h-6" />

          <USkeleton class="rounded-full w-21.25 h-6" />
        </div>

        <!-- Meta Info -->
        <div class="space-y-3 w-full">
          <div class="flex justify-center lg:justify-start items-center gap-2">
            <USkeleton class="w-4 h-4" />

            <USkeleton class="w-30 h-3.5" />
          </div>

          <div class="flex justify-center lg:justify-start items-center gap-2">
            <USkeleton class="w-4 h-4" />

            <USkeleton class="w-25 h-3.5" />
          </div>

          <div class="flex justify-center lg:justify-start items-center gap-2">
            <USkeleton class="w-4 h-4" />

            <USkeleton class="w-35 h-3.5" />
          </div>

          <div class="flex justify-center lg:justify-start items-center gap-2">
            <USkeleton class="w-4 h-4" />

            <USkeleton class="w-22.5 h-3.5" />
          </div>
        </div>

        <!-- Followers/Following -->
        <div class="flex justify-center lg:justify-start items-center gap-4">
          <USkeleton class="w-22.5 h-3.5" />

          <USkeleton class="w-22.5 h-3.5" />
        </div>

        <!-- Views -->
        <div class="flex justify-center lg:justify-start items-center gap-2">
          <USkeleton class="w-4 h-4" />

          <USkeleton class="w-17.5 h-3.5" />
        </div>
      </aside>

      <!-- Main Content Skeleton -->
      <div class="flex-1 space-y-6">
        <!-- Welcome Banner -->
        <UCard>
          <div class="flex justify-between items-center">
            <div class="space-y-2">
              <USkeleton class="w-70 h-6" />

              <USkeleton class="w-[320px] h-4" />
            </div>

            <USkeleton class="w-30 h-3.5" />
          </div>
        </UCard>

        <!-- Stats Grid -->
        <div class="gap-4 grid grid-cols-2 lg:grid-cols-4">
          <UCard
            v-for="i in 4"
            :key="i"
          >
            <div class="flex flex-col items-center text-center">
              <USkeleton class="mb-2 w-5 h-5" />

              <USkeleton class="mb-1 w-15 h-9" />

              <USkeleton class="w-20 h-3" />
            </div>
          </UCard>
        </div>

        <!-- Contributions Section -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-2">
              <USkeleton class="w-5 h-5" />

              <USkeleton class="w-30 h-5" />
            </div>

            <USkeleton class="w-35 h-3.5" />
          </div>

          <UCard>
            <!-- Contribution graph placeholder -->
            <div class="w-full">
              <!-- Month labels row -->
              <div class="flex mb-2">
                <div class="w-8 shrink-0" />

                <div class="flex flex-1 gap-4">
                  <USkeleton
                    v-for="i in 6"
                    :key="i"
                    class="w-7.5 h-2.5"
                  />
                </div>
              </div>
              <!-- Graph grid -->
              <div class="flex gap-2">
                <div class="flex flex-col gap-1 w-8 shrink-0">
                  <USkeleton
                    v-for="i in 7"
                    :key="i"
                    class="w-6 h-2.5"
                  />
                </div>

                <div class="flex-1 gap-0.5 grid grid-cols-[repeat(52,1fr)]">
                  <USkeleton
                    v-for="i in 364"
                    :key="i"
                    class="rounded-sm aspect-square"
                  />
                </div>
              </div>

              <USkeleton class="mt-4 w-35 h-3" />
            </div>
          </UCard>
        </div>

        <!-- Tech Stack & Languages Section -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <USkeleton class="w-5 h-5" />

            <USkeleton class="w-45 h-5" />
          </div>

          <div class="gap-4 grid md:grid-cols-2">
            <!-- TechStack Skeleton -->
            <UCard>
              <div class="space-y-3">
                <USkeleton class="w-25 h-3" />

                <div class="space-y-2">
                  <USkeleton class="w-full h-3.5" />

                  <USkeleton class="w-[90%] h-3.5" />
                </div>

                <div class="flex flex-wrap gap-2 pt-2">
                  <USkeleton
                    v-for="i in 6"
                    :key="i"
                    class="rounded-full w-17.5 h-6"
                  />
                </div>
              </div>
            </UCard>
            <!-- LanguageChart Skeleton -->
            <UCard>
              <div class="flex items-center gap-6">
                <USkeleton class="rounded-full w-30 h-30" />

                <div class="flex-1 space-y-3">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center gap-2">
                      <USkeleton class="rounded-full w-3 h-3" />

                      <USkeleton class="w-20 h-3.5" />
                    </div>

                    <USkeleton class="w-10 h-3.5" />
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Notable Projects Section -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-2">
              <USkeleton class="w-5 h-5" />

              <USkeleton class="w-35 h-5" />
            </div>

            <USkeleton class="rounded-md w-30 h-9" />
          </div>

          <div class="gap-4 grid sm:grid-cols-2">
            <!-- ProjectCard Skeleton -->
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-md"
            >
              <!-- Header -->
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <USkeleton class="w-4 h-4" />

                  <USkeleton class="w-30 h-4.5" />
                </div>

                <USkeleton class="rounded-full w-17.5 h-5.5" />
              </div>
              <!-- Description -->
              <div class="space-y-1 mb-3">
                <USkeleton class="w-full h-3.5" />

                <USkeleton class="w-[80%] h-3.5" />
              </div>
              <!-- Topics -->
              <div class="flex flex-wrap gap-1 mb-3">
                <USkeleton class="rounded-full w-15 h-5" />

                <USkeleton class="rounded-full w-17.5 h-5" />

                <USkeleton class="rounded-full w-13.75 h-5" />
              </div>
              <!-- Stats -->
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <USkeleton class="w-4 h-4" />

                  <USkeleton class="w-7.5 h-3" />
                </div>

                <div class="flex items-center gap-1">
                  <USkeleton class="w-4 h-4" />

                  <USkeleton class="w-6 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
