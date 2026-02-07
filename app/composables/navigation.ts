export type NavigationPhase = "idle" | "exiting" | "entering";

const isLoading = ref(false);
const targetUsername = ref<string | null>(null);
const phase = ref<NavigationPhase>("idle");

export function useNavigationState() {
  const navigateToProfile = async (username: string) => {
    if (isLoading.value) return;

    targetUsername.value = username;
    isLoading.value = true;
    phase.value = "exiting";

    // Wait for exit animation to complete before navigating
    await new Promise(resolve => setTimeout(resolve, 700));

    // Navigate to the profile page (skeleton will show while data loads)
    await navigateTo(`/${username.trim()}?template=github`);

    phase.value = "entering";

    setTimeout(() => {
      phase.value = "idle";
      isLoading.value = false;
      targetUsername.value = null;
    }, 900);
  };

  const profileLoaded = () => {
    // No longer needed since skeleton handles loading state
    if (phase.value === "exiting") {
      phase.value = "entering";

      // Reset after enter animation completes
      setTimeout(() => {
        phase.value = "idle";
        isLoading.value = false;
        targetUsername.value = null;
      }, 500);
    }
  };

  const reset = () => {
    isLoading.value = false;
    targetUsername.value = null;
    phase.value = "idle";
  };

  return {

    isLoading: readonly(isLoading),
    targetUsername: readonly(targetUsername),
    phase: readonly(phase),
    navigateToProfile,
    profileLoaded,
    reset,
  };
}
