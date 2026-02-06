import z from "zod";

const getProfileSchema = z.object({
  username: z.string()
    .nonempty("Username is required")
    .max(39, "Username must be at most 39 characters")
    .refine(value => !value.includes("--"), { error: "Username cannot contain consecutive hyphens" })
    .refine(value => !(value.startsWith("-") || value.endsWith("-")), {
      error: "Username cannot start or end with a hyphen",
    })
    .refine(value => /^[a-z0-9-]+$/i.test(value), {
      error: "Username can only contain alphanumeric characters and hyphens",
    }),
});

export type GetProfileSchema = z.infer<typeof getProfileSchema>;

export { getProfileSchema };
