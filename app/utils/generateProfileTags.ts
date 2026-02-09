export function generateProfileTags(profile: GitHubProfile): string[] {
  const tags: string[] = [];

  // Based on stars
  if (profile.stats.totalStars > 1000) tags.push("Popular Creator");

  else if (profile.stats.totalStars > 100) tags.push("Rising Star");

  // Based on repos
  if (profile.stats.totalRepos > 50) tags.push("Prolific");

  // Based on followers
  if (profile.stats.followers > 1000) tags.push("Influencer");

  else if (profile.stats.followers > 100) tags.push("Community Member");

  // Based on languages
  const topLanguage = profile.languages[0];
  if (topLanguage) {
    const langCategory = getLanguageCategory(topLanguage.name);
    if (langCategory) tags.push(langCategory);
  }

  // Based on activity
  if (profile.contributions) {
    const totalContributions = profile.contributions.contributionCalendar.totalContributions;
    if (totalContributions > 1000) tags.push("Highly Active");

    else if (totalContributions > 365) tags.push("Consistent");
  }

  // Based on years
  if (profile.stats.yearsActive > 5) tags.push("Veteran");

  return tags.slice(0, 4); // Max 4 tags
}
