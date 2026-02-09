export function getMostActiveDay(profile: GitHubProfile): ContributionDay | null {
  if (!profile.contributions) return null;

  let maxDay: ContributionDay | null = null;
  for (const week of profile.contributions.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      if (!maxDay || day.contributionCount > maxDay.contributionCount) {
        maxDay = day;
      }
    }
  }
  return maxDay;
}

export function getContributionStreak(profile: GitHubProfile): number {
  if (!profile.contributions) return 0;

  const allDays: ContributionDay[] = [];
  for (const week of profile.contributions.contributionCalendar.weeks) allDays.push(...week.contributionDays);

  // Sort by date descending
  allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of allDays) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    // Skip future dates
    if (dayDate > today) continue;

    // Check if this is part of the streak
    const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak && day.contributionCount > 0) streak++;

    else if (daysDiff > streak) break;
  }

  return streak;
}

export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

// Get contribution color based on level
export function getContributionColor(level: number): string {
  const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  return colors[Math.min(level, 4)] || "#161b22";
}

// Calculate total contributions from calendar
export function getTotalContributions(profile: GitHubProfile): number {
  if (!profile.contributions) return 0;
  return profile.contributions.contributionCalendar.totalContributions;
}

// Get top languages with proper formatting
export function getTopLanguages(profile: GitHubProfile, limit: number = 5): LanguageStats[] {
  return profile.languages.slice(0, limit);
}

// Generate a bio summary if none exists
export function generateBioSummary(profile: GitHubProfile): string {
  const parts: string[] = [];

  // Add company if exists
  if (profile.user.company) {
    parts.push(`Works at ${profile.user.company.replace("@", "")}`);
  }

  // Add location if exists
  if (profile.user.location) {
    parts.push(`Based in ${profile.user.location}`);
  }

  // Add top language
  if (profile.languages.length > 0) {
    parts.push(`${profile.languages[0]?.name} enthusiast`);
  }

  // Add activity summary
  const totalContributions = getTotalContributions(profile);
  if (totalContributions > 0) {
    parts.push(`${formatNumber(totalContributions)} contributions this year`);
  }

  return parts.join(" • ") || "GitHub developer";
}

// Get recent activity summary
export function getActivitySummary(profile: GitHubProfile): string {
  if (!profile.contributions) {
    return `${profile.stats.totalRepos} public repositories`;
  }

  const totalContributions = profile.contributions.contributionCalendar.totalContributions;
  const commits = profile.contributions.totalCommitContributions;
  const prs = profile.contributions.totalPullRequestContributions;

  const parts: string[] = [];
  if (commits > 0) parts.push(`${formatNumber(commits)} commits`);
  if (prs > 0) parts.push(`${formatNumber(prs)} PRs`);

  return `${formatNumber(totalContributions)} contributions (${parts.join(", ")})`;
}

// Check if profile has enough data for full display
export function hasFullProfileData(profile: GitHubProfile): boolean {
  return (
    profile.contributions !== null
    && profile.pinnedRepositories.length > 0
    && profile.languages.length > 0
  );
}

// Generate shareable URL
export function generateShareUrl(
  username: string,
  options?: { template?: string; theme?: string },
): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const params = new URLSearchParams();

  if (options?.template) params.set("template", options.template);
  if (options?.theme) params.set("theme", options.theme);

  const queryString = params.toString();
  return `${baseUrl}/${username}${queryString ? `?${queryString}` : ""}`;
}
