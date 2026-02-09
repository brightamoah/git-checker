import * as z from "zod";

import tryParseEnv from "./tryParseEnv";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  NUXT_GITHUB_TOKEN: z.string(),
  NUXT_SITE_URL: z.url(),
  NUXT_GITHUB_API_URL: z.url(),
  NUXT_GITHUB_REPO_URL: z.url(),
  NUXT_AUTHOR_GITHUB_URL: z.url(),
  NUXT_AUTHOR_LINKEDIN_URL: z.url(),
  NUXT_GITHUB_GRAPHQL_URL: z.url(),
  NUXT_GITHUB_REST_URL: z.url(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export const env = EnvSchema.parse(process.env);
