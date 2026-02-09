function calculateLanguageStats(repositories: GitHubRepository[]): LanguageStats[] {
  const languageBytes = new Map<string, { bytes: number; color: string }>();

  for (const repo of repositories) {
    // GraphQL path: use detailed byte counts
    if (repo.languages?.edges) {
      for (const edge of repo.languages.edges) {
        const existing = languageBytes.get(edge.node.name);
        if (existing) {
          existing.bytes += edge.size;
        }
        else {
          languageBytes.set(edge.node.name, {
            bytes: edge.size,
            color: edge.node.color,
          });
        }
      }
    }
    else if (repo.primaryLanguage) {
      // REST fallback: use repo count (1 per repo)
      const existing = languageBytes.get(repo.primaryLanguage.name);
      if (existing) {
        existing.bytes += 1;
      }
      else {
        languageBytes.set(repo.primaryLanguage.name, {
          bytes: 1,
          color: repo.primaryLanguage.color,
        });
      }
    }
  }
  const totalBytes = Array.from(languageBytes.values()).reduce((sum, lang) => sum + lang.bytes, 0);

  if (totalBytes === 0) return [];

  const stats: LanguageStats[] = Array.from(languageBytes.entries())
    .map(([name, data]) => ({
      name,
      color: data.color,
      percentage: Math.round((data.bytes / totalBytes) * 100),
      size: data.bytes,
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  // Fix rounding to ensure 100%
  const sum = stats.reduce((s, x) => s + x.percentage, 0);
  if (stats.length > 0 && sum !== 100) {
    stats[0]!.percentage += 100 - sum;
  }

  return stats;
}

// Calculate years active from account creation
function calculateYearsActive(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const years = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(1, Math.round(years));
}

export { calculateLanguageStats, calculateYearsActive };
