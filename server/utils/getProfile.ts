import { graphql } from "@octokit/graphql";

export async function fetchUserGraphQL(username: string): Promise<GitHubResult<GitHubProfile>> {
  const config = useRuntimeConfig();
  const githubToken = config.githubToken;

  if (!githubToken) {
    return {
      success: false,
      error: {
        type: "UNAUTHORIZED",
        message: "GitHub token not configured. Using REST API fallback.",
      },
    };
  }

  try {
    const graphqlWithAuth = githubToken
      ? graphql.defaults({ headers: { authorization: `token ${githubToken}` } })
      : graphql;

    const result = await graphqlWithAuth<GraphQLUserResponse>(USER_QUERY, { username });

    const profile = transformGraphQLResponse(result);
    return { success: true, data: profile };
  }
  catch (error) {
    return {
      success: false,
      error: {
        type: "UNKNOWN",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

// Fetch user via REST API (fallback, no token needed)
async function fetchUserREST(username: string): Promise<GitHubResult<GitHubProfile>> {
  try {
    const config = useRuntimeConfig();
    const githubToken = config.githubToken;
    const githubRestUrl = config.githubRestUrl;

    const headers: HeadersInit = {
      "User-Agent": "CheckMyGit",
      "Accept": "application/vnd.github.v3+json",
    };

    // Add token if available for higher rate limits
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    // Fetch user data
    const userResponse = await fetch(`${githubRestUrl}/users/${username}`, { headers });

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return {
          success: false,
          error: { type: "NOT_FOUND", message: `User "${username}" not found`, status: 404 },
        };
      }
      if (userResponse.status === 403) {
        return {
          success: false,
          error: { type: "RATE_LIMIT", message: "GitHub API rate limit exceeded", status: 403 },
        };
      }
      return {
        success: false,
        error: { type: "UNKNOWN", message: `GitHub API error: ${userResponse.statusText}`, status: userResponse.status },
      };
    }

    const userData = (await userResponse.json()) as RESTUserResponse;

    // Fetch repositories
    const reposResponse = await fetch(
      `${githubRestUrl}/users/${username}/repos?sort=stars&direction=desc&per_page=100`,
      { headers },
    );
    const reposData = reposResponse.ok ? ((await reposResponse.json()) as RESTRepoResponse[]) : [];

    const profile = transformRESTResponse(userData, reposData);
    return { success: true, data: profile };
  }
  catch (error) {
    return {
      success: false,
      error: {
        type: "UNKNOWN",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

// Main fetch function - tries GraphQL first, falls back to REST
export async function fetchGitHubProfile(username: string): Promise<GitHubResult<GitHubProfile>> {
  // Clean the username
  const cleanUsername = username.trim().replace(/^@/, "");

  const config = useRuntimeConfig();
  const githubToken = config.githubToken;

  // Try GraphQL first if token is available
  if (githubToken) {
    const graphqlResult = await fetchUserGraphQL(cleanUsername);
    if (graphqlResult.success) {
      return graphqlResult;
    }
    // If GraphQL fails for reasons other than missing token, fall back to REST
    if (graphqlResult.error.type !== "UNAUTHORIZED") {
      return graphqlResult;
    }
  }

  // Fall back to REST API
  return fetchUserREST(cleanUsername);
}
