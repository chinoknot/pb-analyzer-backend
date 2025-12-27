const API_BASE = "https://v3.football.api-sports.io";

export async function apiFootballGet(
  path: string,
  params: Record<string, string> = {}
) {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) throw new Error("Missing API_FOOTBALL_KEY");

  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, v)
  );

  const res = await fetch(url.toString(), {
    headers: { "x-apisports-key": key }
  });

  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json;
}
