export async function checkRateLimit(): Promise<{ remaining: number; reset: Date } | null> {
  try {
    const headers: HeadersInit = {
      "User-Agent": "CheckMyGit",
    };

    const config = useRuntimeConfig();

    const githubToken = config.githubToken;

    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    const response = await fetch(`${config.githubRestUrl}/rate_limit`, { headers });
    if (!response.ok) return null;

    const data = await response.json();
    return {
      remaining: data.resources.core.remaining,
      reset: new Date(data.resources.core.reset * 1000),
    };
  }
  catch {
    return null;
  }
}
