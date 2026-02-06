export type ColorType = "primary" | "secondary" | "success" | "info" | "warning" | "error";

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
    color: ColorType;
  } | null;
  isPrivate: boolean;
  isFork: boolean;
  createdAt: string;
  updatedAt: string;
  homepageUrl: string | null;
}

export interface LanguageStats {
  name: string;
  color: ColorType;
  percentage: number;
  size: number;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: ColorType;
  contributionLevel: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
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

export type TemplateType = "github" | "bento" | "minimal";

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
};
