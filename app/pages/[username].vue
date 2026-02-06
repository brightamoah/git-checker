<script setup lang="ts">
const route = useRoute();
const username = computed(() => route.params.username as string);
const template = computed({
  get: () => (route.query.template as TemplateType) || "github",
  set: (newTemplate: TemplateType) => {
    navigateTo(`/${username.value}?template=${newTemplate}`);
  },
});

const { data: profile, pending, error } = await useFetch<GitHubProfile>(
  `/api/profile/${username.value}`,
);

const templates = [
  { value: "github", label: "GitHub Style" },
  { value: "bento", label: "Bento Grid" },
  { value: "minimal", label: "Minimal CV" },
];
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 py-8 container">
      <!-- Template Selector -->
      <div class="flex justify-between items-center mb-8">
        <NuxtLink
          to="/"
          class="hover:text-inverted transition-colors"
        >
          ← Back to Search
        </NuxtLink>

        <USelectMenu
          v-model="template"
          :options="templates"
          value-attribute="value"
          option-attribute="label"
        />
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="py-20 text-center"
      >
        <USkeleton class="w-full h-64" />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="py-20 text-center"
      >
        <UAlert
          title="Error"
          :description="error.message"
          color="error"
        />
      </div>

      <!-- Profile Display -->
      <div v-else-if="profile">
        <TemplateGithub
          v-if="template === 'github'"
          :profile="profile"
        />

        <!-- <TemplateBento
          v-else-if="template === 'bento'"
          :profile="profile"
        />

        <TemplateMinimal
          v-else
          :profile="profile"
        /> -->
      </div>
    </div>
  </div>
</template>
