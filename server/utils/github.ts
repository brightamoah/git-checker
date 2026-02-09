import { graphql } from "@octokit/graphql";

export async function fetchGitHubProfileOld(username: string, token?: string): Promise<GitHubProfile> {
  const graphqlWithAuth = token
    ? graphql.defaults({ headers: { authorization: `token ${token}` } })
    : graphql;

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          bio
          avatarUrl
          location
          company
          websiteUrl
          twitterUsername
          email
          followers { totalCount }
          following { totalCount }
          createdAt
          updatedAt
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage { name color }
              isPrivate
              isFork
              createdAt
              updatedAt
              homepageUrl
            }
          }
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage { name color }
                isPrivate
                isFork
                createdAt
                updatedAt
                homepageUrl
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                  contributionLevel
                }
              }
            }
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
          }
        }
      }
    `;

    const result: any = await graphqlWithAuth(query, { username });

    return transformGraphQLResponse(result.user);
  }
  catch {
    throw createError({
      statusCode: 404,
      message: `GitHub user "${username}" not found`,
    });
  }
}

function transformGraphQLResponse(data: any): GitHubProfile {
  const repositories = data.repositories.nodes.filter((r: any) => !r.isPrivate);
  const originalRepos = repositories.filter((r: any) => !r.isFork);
  const pinnedRepositories = data.pinnedItems.nodes.filter((r: any) => !r.isPrivate);

  const languages = calculateLanguageStats(originalRepos);
  const yearsActive = calculateYearsActive(data.createdAt);

  const totalStars = repositories.reduce((sum: number, repo: any) => sum + repo.stargazerCount, 0);
  const originalStars = originalRepos.reduce((sum: number, repo: any) => sum + repo.stargazerCount, 0);
  const totalForks = repositories.reduce((sum: number, repo: any) => sum + repo.forkCount, 0);

  return {
    user: {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      location: data.location,
      company: data.company,
      websiteUrl: data.websiteUrl,
      twitterUsername: data.twitterUsername,
      email: data.email,
      followers: data.followers.totalCount,
      following: data.following.totalCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    },
    repositories,
    pinnedRepositories,
    contributions: data.contributionsCollection,
    languages,
    stats: {
      totalRepos: repositories.length,
      totalStars,
      originalStars,
      totalForks,
      followers: data.followers.totalCount,
      following: data.following.totalCount,
      yearsActive,
    },
  };
}

function calculateLanguageStats(repos: any[]): LanguageStats[] {
  const langMap = new Map<string, { color: string; size: number }>();

  repos.forEach((repo) => {
    if (repo.primaryLanguage) {
      const existing = langMap.get(repo.primaryLanguage.name);
      langMap.set(repo.primaryLanguage.name, {
        color: repo.primaryLanguage.color,
        size: (existing?.size || 0) + 1,
      });
    }
  });

  const total = Array.from(langMap.values()).reduce((sum, lang) => sum + lang.size, 0);

  return Array.from(langMap.entries())
    .map(([name, data]) => ({
      name,
      color: data.color,
      size: data.size,
      percentage: (data.size / total) * 100,
    }))
    .sort((a, b) => b.size - a.size);
}

function calculateYearsActive(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
}
