export function getLanguageCategory(language: string): string | null {
  const categories: Record<string, string[]> = {
    "Full-Stack": ["TypeScript", "JavaScript", "Python", "Ruby", "PHP"],
    "Systems": ["Rust", "Go", "C", "C++"],
    "Mobile": ["Swift", "Kotlin", "Dart"],
    "Data Science": ["Python", "R", "Julia"],
    "DevOps": ["Shell", "Dockerfile", "HCL"],
  };

  for (const [category, languages] of Object.entries(categories)) {
    if (languages.includes(language)) {
      return category;
    }
  }
  return null;
}
