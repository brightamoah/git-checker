export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const config = useRuntimeConfig();

  if (!username) {
    throw createError({
      statusCode: 400,
      message: "Username is required",
    });
  }

  try {
    const profile = await fetchGitHubProfile(username, config.githubToken);
    return profile;
  }
  catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to fetch GitHub profile",
    });
  }
});
