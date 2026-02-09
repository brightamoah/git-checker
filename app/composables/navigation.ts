export function useNavigationState() {
  const route = useRoute();
  const router = useRouter();

  const isLoading = useState<boolean>("nav-isLoading", () => false);

  const targetUsername = useState<string>("nav-targetUsername", () => "");

  const phase = useState<NavigationPhase>("nav-phase", () => "idle");

  const showControls = useState<boolean>("nav-showControls", () => false);

  const template = useState<TemplateType>("selected-template", () =>
    (route.query.template as TemplateType) || "github");

  const navigateToProfile = async (username: string) => {
    if (isLoading.value) return;

    targetUsername.value = username;
    isLoading.value = true;
    phase.value = "exiting";

    // Wait for exit animation to complete before navigating
    await new Promise(resolve => setTimeout(resolve, 700));

    await navigateTo(`/${username.trim()}?template=${template.value}`);

    phase.value = "entering";

    setTimeout(() => {
      phase.value = "idle";
      isLoading.value = false;
      targetUsername.value = "";
    }, 900);
  };

  const updateTemplate = (newTemplate: TemplateType) => {
    template.value = newTemplate;
    router.push({ query: { ...route.query, template: newTemplate } });
  };

  const profileLoaded = () => {
    // No longer needed since skeleton handles loading state
    if (phase.value === "exiting") {
      phase.value = "entering";

      // Reset after enter animation completes
      setTimeout(() => {
        phase.value = "idle";
        isLoading.value = false;
        targetUsername.value = "";
      }, 500);
    }
  };

  const reset = () => {
    isLoading.value = false;
    targetUsername.value = "";
    phase.value = "idle";
  };

  return {
    isLoading,
    targetUsername,
    phase,
    showControls,
    template,
    navigateToProfile,
    profileLoaded,
    reset,
    updateTemplate,
  };
}
