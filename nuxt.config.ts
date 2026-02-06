import { env } from "./app/libs/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/image",
  ],

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  eslint: {
    config: {
      standalone: false,
    },
  },

  app: {
    head: {
      title: "Git-Checker - Transform GitHub Profiles",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Visualize and share your Github profile in seconds!" },
      ],
    },
  },

  runtimeConfig: {
    githubToken: env.NUXT_GITHUB_TOKEN,
    public: {
      githubApiUrl: env.NUXT_GITHUB_API_URL,
      githubRepoUrl: env.NUXT_GITHUB_REPO_URL,
      siteUrl: env.NUXT_SITE_URL,
      authorGithubUrl: env.NUXT_AUTHOR_GITHUB_URL,
      authorLinkedInUrl: env.NUXT_AUTHOR_LINKEDIN_URL,
    },
  },

  experimental: {
    typedPages: true,
  },
});
