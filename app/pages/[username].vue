<script setup lang="ts">
const route = useRoute();

const TemplateGitHub = defineAsyncComponent(() => import("~/components/template/github.vue"));
const TemplateBento = defineAsyncComponent(() => import("~/components/template/bento.vue"));
const TemplateMinimal = defineAsyncComponent(() => import("~/components/template/minimal.vue"));

const { template, showControls, isLoading } = useNavigationState();

const username = computed(() => route.params.username as string);

const { data, pending, error } = useFetch(
  `/api/profile/${username.value}`,
  {
    lazy: true,
    transform: res => res as {
      success: boolean;
      data: GitHubProfile;
    },
  },
);

onMounted(() => showControls.value = true);
onUnmounted(() => showControls.value = false);

const profile = computed(() => data.value?.data as GitHubProfile);

provide(profileKey, profile);
</script>

<template>
  <div class="min-h-screen">
    <ProfileSkeleton v-if="pending || isLoading" />

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

    <main v-else-if="data">
      <Transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="template === 'github' ? TemplateGitHub : template === 'bento' ? TemplateBento : TemplateMinimal"
          :profile
        />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
