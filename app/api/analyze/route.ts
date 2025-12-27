import { apiFootballGet } from "@/lib/apiFootball";

export async function POST(req: Request) {
  const { fixture_id } = await req.json();

  const fx = await apiFootballGet("/fixtures", { id: String(fixture_id) });
  const fixture = fx.response[0];

  const homeId = fixture.teams.home.id;
  const awayId = fixture.teams.away.id;
  const leagueId = fixture.league.id;
  const season = fixture.league.season;

  const hStats = await apiFootballGet("/teams/statistics", {
    team: String(homeId),
    league: String(leagueId),
    season: String(season)
  });

  const aStats = await apiFootballGet("/teams/statistics", {
    team: String(awayId),
    league: String(leagueId),
    season: String(season)
  });

  const hGF = hStats.response.goals.for.average.home;
  const hGA = hStats.response.goals.against.average.home;
  const aGF = aStats.response.goals.for.average.away;
  const aGA = aStats.response.goals.against.average.away;

  const lambdaHome = (hGF + aGA) / 2;
  const lambdaAway = (aGF + hGA) / 2;
  const mu = lambdaHome + lambdaAway;

  return Response.json({
    fixture: {
      home: fixture.teams.home.name,
      away: fixture.teams.away.name
    },
    goals_expected: mu
  });
}
