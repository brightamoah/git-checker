import type { InjectionKey } from "vue";

export const profileKey = Symbol("profile") as InjectionKey<ComputedRef<GitHubProfile>>;
