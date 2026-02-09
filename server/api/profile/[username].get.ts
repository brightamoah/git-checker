export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");

  const cleanUsername = getProfileSchema.shape.username.safeParse(username);

  if (!cleanUsername.success) {
    throw createError({
      statusCode: 400,
      message: cleanUsername.error.issues.map(e => e.message).join(", "),
    });
  }

  try {
    const profile = await fetchUserGraphQL(cleanUsername.data);
    return profile;
  }
  catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to fetch GitHub profile",
    });
  }
});
