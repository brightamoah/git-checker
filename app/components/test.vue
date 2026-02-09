<script setup lang="ts">
const router = useRouter();
const username = ref("");
const isLoading = ref(false);

async function handleSearch() {
  if (!username.value.trim()) return;

  isLoading.value = true;
  await router.push(`/${username.value}?template=github`);
  isLoading.value = false;
}
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 py-20 container">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="mb-6 font-bold text-5xl">
          CheckMyGit
        </h1>

        <p class="mb-12 text-xl">
          Transform any GitHub profile into a stunning portfolio in seconds
        </p>

        <UForm
          class="flex gap-4 mx-auto max-w-xl"
          @submit="handleSearch"
        >
          <UFieldGroup class="flex-1 rounded-2xl">
            <UInput
              v-model="username"
              icon="i-simple-icons-github"
              placeholder="Enter GitHub username..."
              size="xl"
              class="flex-1 rounded-2xl"
              :disabled="isLoading"
            />

            <UButton
              type="submit"
              size="xl"
              :loading="isLoading"
            >
              Generate
            </UButton>
          </UFieldGroup>
        </UForm>

        <div class="gap-6 grid grid-cols-1 md:grid-cols-3 mt-12 text-left">
          <UCard>
            <template #header>
              <h3 class="font-semibold">
                3 Templates
              </h3>
            </template>

            <p class="text-sm">
              GitHub-style sidebar, Bento grid, or Minimal CV layout
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold">
                Contribution Graph
              </h3>
            </template>

            <p class="text-sm">
              Full year heatmap visualization of your activity
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold">
                PNG Export
              </h3>
            </template>

            <p class="text-sm">
              Download your portfolio as a shareable image
            </p>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
