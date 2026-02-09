export function transformRESTResponse(userData: RESTUserResponse, reposData: RESTRepoResponse[]): GitHubProfile {
  // Include all public repos (both original and forks)
  const repositories: GitHubRepository[] = reposData
    .filter(repo => !repo.private)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepageUrl: repo.homepage,
      stargazerCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      primaryLanguage: repo.language
        ? { name: repo.language, color: LANGUAGE_COLORS[repo.language] || "#8b949e" }
        : null,
      isPrivate: repo.private,
      isFork: repo.fork,
      isArchived: repo.archived,
      topics: repo.topics || [],
      pushedAt: repo.pushed_at,
      createdAt: repo.created_at,
    }));

  // Filter out forks for language stats
  const originalRepos = repositories.filter(repo => !repo.isFork);
  const languages = calculateLanguageStats(originalRepos);
  const yearsActive = calculateYearsActive(userData.created_at);

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const originalStars = originalRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forkCount, 0);

  return {
    user: {
      login: userData.login,
      name: userData.name,
      bio: userData.bio,
      avatarUrl: userData.avatar_url,
      location: userData.location,
      company: userData.company,
      websiteUrl: userData.blog,
      twitterUsername: userData.twitter_username,
      email: userData.email,
      followers: userData.followers,
      following: userData.following,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    },
    repositories,
    pinnedRepositories: originalRepos.slice(0, 6), // REST API doesn't have pinned items
    contributions: null, // REST API doesn't have contribution data
    languages,
    stats: {
      totalRepos: userData.public_repos,
      totalStars,
      originalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      yearsActive,
    },
  };
}
