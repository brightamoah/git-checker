import type { InjectionKey } from "vue";

export const profileKey = Symbol("profile") as InjectionKey<ComputedRef<GitHubProfile>>;

export const sortByKey = Symbol("sortBy") as InjectionKey<Ref<"stars" | "pinned">>;

export const sortOptionsKey = Symbol("sortOptions") as InjectionKey<Ref<{ label: string; value: "stars" | "pinned" }[]>>;

export const sortedReposKey = Symbol("sortedRepos") as InjectionKey<ComputedRef<GitHubRepository[]>>;
