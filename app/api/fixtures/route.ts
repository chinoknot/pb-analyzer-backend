import { apiFootballGet } from "@/lib/apiFootball";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const data = await apiFootballGet("/fixtures", {
    date: today,
    league: "135",
    season: "2025"
  });

  const fixtures = data.response.map((f: any) => ({
    fixture_id: f.fixture.id,
    home: f.teams.home.name,
    away: f.teams.away.name,
    kickoff: f.fixture.date,
    league: f.league.name
  }));

  return Response.json({ fixtures });
}
