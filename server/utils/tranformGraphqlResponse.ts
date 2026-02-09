export function transformGraphQLResponse(data: GraphQLUserResponse): GitHubProfile {
  const user = data.user!;

  const repositories: GitHubRepository[] = user.repositories.nodes.map(repo => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepageUrl: repo.homepageUrl,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    primaryLanguage: repo.primaryLanguage,
    languages: repo.languages,
    isPrivate: repo.isPrivate,
    isFork: repo.isFork,
    isArchived: repo.isArchived,
    topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
    pushedAt: repo.pushedAt,
    createdAt: repo.createdAt,
  }));

  const pinnedRepositories: GitHubRepository[] = user.pinnedItems.nodes.map(repo => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepageUrl: repo.homepageUrl,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    primaryLanguage: repo.primaryLanguage,
    languages: repo.languages,
    isPrivate: repo.isPrivate,
    isFork: repo.isFork,
    isArchived: repo.isArchived,
    topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
    pushedAt: repo.pushedAt,
    createdAt: repo.createdAt,
  }));

  // Process external contributions (repos not owned by the user)
  const userLogin = user.login.toLowerCase();
  const externalContributionsMap = new Map<string, ExternalContribution>();

  // Process PR contributions to external repos
  for (const prContrib of user.contributionsCollection.pullRequestContributionsByRepository) {
    const ownerLogin = prContrib.repository.owner.login.toLowerCase();
    if (ownerLogin !== userLogin) {
      const repoKey = prContrib.repository.nameWithOwner;
      const existing = externalContributionsMap.get(repoKey);
      if (existing) {
        existing.prCount += prContrib.contributions.totalCount;
      }
      else {
        externalContributionsMap.set(repoKey, {
          repoName: prContrib.repository.nameWithOwner,
          owner: prContrib.repository.owner.login,
          prCount: prContrib.contributions.totalCount,
          commitCount: 0,
          language: prContrib.repository.primaryLanguage,
          stargazerCount: prContrib.repository.stargazerCount,
        });
      }
    }
  }

  // Process commit contributions to external repos
  for (const commitContrib of user.contributionsCollection.commitContributionsByRepository) {
    const ownerLogin = commitContrib.repository.owner.login.toLowerCase();
    if (ownerLogin !== userLogin) {
      const repoKey = commitContrib.repository.nameWithOwner;
      const existing = externalContributionsMap.get(repoKey);
      if (existing) {
        existing.commitCount += commitContrib.contributions.totalCount;
      }
      else {
        externalContributionsMap.set(repoKey, {
          repoName: commitContrib.repository.nameWithOwner,
          owner: commitContrib.repository.owner.login,
          prCount: 0,
          commitCount: commitContrib.contributions.totalCount,
          language: commitContrib.repository.primaryLanguage,
          stargazerCount: 0,
        });
      }
    }
  }

  const externalContributions = Array.from(externalContributionsMap.values())
    .sort((a, b) => (b.prCount + b.commitCount) - (a.prCount + a.commitCount));

  const externalPRCount = externalContributions.reduce((sum, c) => sum + c.prCount, 0);
  const externalCommitCount = externalContributions.reduce((sum, c) => sum + c.commitCount, 0);

  const contributions: ContributionsCollection = {
    totalCommitContributions: user.contributionsCollection.totalCommitContributions,
    totalIssueContributions: user.contributionsCollection.totalIssueContributions,
    totalPullRequestContributions: user.contributionsCollection.totalPullRequestContributions,
    totalPullRequestReviewContributions: user.contributionsCollection.totalPullRequestReviewContributions,
    contributionCalendar: user.contributionsCollection.contributionCalendar,
    externalContributions,
    externalPRCount,
    externalCommitCount,
  };

  // Filter out forks for language stats (only count original work)
  const originalRepos = repositories.filter(repo => !repo.isFork);
  const languages = calculateLanguageStats(originalRepos);
  const yearsActive = calculateYearsActive(user.createdAt);

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const originalStars = originalRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forkCount, 0);

  return {
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      location: user.location,
      company: user.company,
      websiteUrl: user.websiteUrl,
      twitterUsername: user.twitterUsername,
      email: user.email,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    repositories,
    pinnedRepositories: pinnedRepositories.length > 0 ? pinnedRepositories : originalRepos.slice(0, 6),
    contributions,
    languages,
    stats: {
      totalRepos: user.repositories.totalCount,
      totalStars,
      originalStars,
      totalForks,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      yearsActive,
    },
  };
}
