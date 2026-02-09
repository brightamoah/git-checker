// export type ColorType = "primary" | "secondary" | "success" | "info" | "warning" | "error";

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  location: string | null;
  company: string | null;
  websiteUrl: string | null;
  twitterUsername: string | null;
  email: string | null;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  topics: string[];
  pushedAt: string | null;
  createdAt: string;
  updatedAt?: string;
  homepageUrl: string | null;
  languages?: RepositoryLanguages;
}

export interface RepositoryLanguageEdge {
  size: number;
  node: {
    name: string;
    color: string;
  };
}

export interface RepositoryLanguages {
  edges: RepositoryLanguageEdge[];
}

export interface LanguageStats {
  name: string;
  color: string;
  percentage: number;
  size: number;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
  contributionLevel?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface RepositoryContribution {
  repository: {
    nameWithOwner: string;
    owner: { login: string };
    primaryLanguage: { name: string; color: string } | null;
    stargazerCount?: number;
  };
  contributions: {
    totalCount: number;
  };
}

export interface ExternalContribution {
  repoName: string;
  owner: string;
  prCount: number;
  commitCount: number;
  language: { name: string; color: string } | null;
  stargazerCount: number;
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: ContributionCalendar;
  externalContributions?: ExternalContribution[];
  externalPRCount?: number;
  externalCommitCount?: number;
}

export interface GitHubProfile {
  user: GitHubUser;
  repositories: GitHubRepository[];
  pinnedRepositories: GitHubRepository[];
  contributions: ContributionsCollection | null;
  languages: LanguageStats[];
  stats: {
    totalRepos: number;
    totalStars: number;
    originalStars: number;
    totalForks: number;
    followers: number;
    following: number;
    yearsActive: number;
  };
}

// GraphQL API Response Types
export interface GraphQLUserResponse {
  user: {
    login: string;
    name: string | null;
    bio: string | null;
    avatarUrl: string;
    location: string | null;
    company: string | null;
    websiteUrl: string | null;
    twitterUsername: string | null;
    email: string | null;
    followers: { totalCount: number };
    following: { totalCount: number };
    createdAt: string;
    updatedAt: string;
    repositories: {
      totalCount: number;
      nodes: Array<{
        name: string;
        description: string | null;
        url: string;
        homepageUrl: string | null;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage: { name: string; color: string } | null;
        languages: {
          edges: Array<{
            size: number;
            node: { name: string; color: string };
          }>;
        };
        isPrivate: boolean;
        isFork: boolean;
        isArchived: boolean;
        repositoryTopics: {
          nodes: Array<{ topic: { name: string } }>;
        };
        pushedAt: string | null;
        createdAt: string;
      }>;
    };
    pinnedItems: {
      nodes: Array<{
        name: string;
        description: string | null;
        url: string;
        homepageUrl: string | null;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage: { name: string; color: string } | null;
        languages: {
          edges: Array<{
            size: number;
            node: { name: string; color: string };
          }>;
        };
        isPrivate: boolean;
        isFork: boolean;
        isArchived: boolean;
        repositoryTopics: {
          nodes: Array<{ topic: { name: string } }>;
        };
        pushedAt: string | null;
        createdAt: string;
      }>;
    };
    contributionsCollection: {
      totalCommitContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            date: string;
            contributionCount: number;
            color: string;
          }>;
        }>;
      };
      pullRequestContributionsByRepository: Array<{
        repository: {
          nameWithOwner: string;
          owner: { login: string };
          primaryLanguage: { name: string; color: string } | null;
          stargazerCount: number;
        };
        contributions: {
          totalCount: number;
        };
      }>;
      commitContributionsByRepository: Array<{
        repository: {
          nameWithOwner: string;
          owner: { login: string };
          primaryLanguage: { name: string; color: string } | null;
        };
        contributions: {
          totalCount: number;
        };
      }>;
    };
  } | null;
}

// REST API Response Types
export interface RESTUserResponse {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  email: string | null;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  public_repos: number;
}

export interface RESTRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
  fork: boolean;
  archived: boolean;
  topics: string[];
  pushed_at: string | null;
  created_at: string;
}

// API Error Types
export interface GitHubError {
  type: "NOT_FOUND" | "RATE_LIMIT" | "UNAUTHORIZED" | "UNKNOWN";
  message: string;
  status?: number;
}

export type GitHubResult<T> = { success: true; data: T } | { success: false; error: GitHubError };

export type TemplateType = "github" | "bento" | "minimal";
export type NavigationPhase = "idle" | "exiting" | "entering";

export const LANGUAGE_COLORS: Record<string, string> = {
  "TypeScript": "#3178c6",
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "Java": "#b07219",
  "C++": "#f34b7d",
  "C": "#555555",
  "C#": "#178600",
  "Ruby": "#701516",
  "PHP": "#4F5D95",
  "Swift": "#F05138",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "Vue": "#41b883",
  "Svelte": "#ff3e00",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "SCSS": "#c6538c",
  "Shell": "#89e051",
  "Dockerfile": "#384d54",
  "Less": "#1d365d",
  "Makefile": "#427819",
  "Assembly": "#6E4C13",

};

export type RepoType = "original" | "fork" | "all";

export interface ProfileProps {
  username?: string;
  template?: TemplateType;
  views?: number;
  profile?: GitHubProfile;
  showStarsFilter?: boolean;
}
