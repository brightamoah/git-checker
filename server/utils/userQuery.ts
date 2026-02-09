export const USER_QUERY = `
query GetUserProfile($username: String!) {
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
    repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
      totalCount
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        forkCount
        primaryLanguage { name color }
        languages(first: 10) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
        isPrivate
        isFork
        isArchived
        repositoryTopics(first: 10) {
          nodes { topic { name } }
        }
        pushedAt
        createdAt
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 10) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          isPrivate
          isFork
          isArchived
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
          pushedAt
          createdAt
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
      pullRequestContributionsByRepository(maxRepositories: 100) {
        repository {
          nameWithOwner
          owner { login }
          primaryLanguage { name color }
          stargazerCount
        }
        contributions {
          totalCount
        }
      }
      commitContributionsByRepository(maxRepositories: 100) {
        repository {
          nameWithOwner
          owner { login }
          primaryLanguage { name color }
        }
        contributions {
          totalCount
        }
      }
    }
  }
}
`;
